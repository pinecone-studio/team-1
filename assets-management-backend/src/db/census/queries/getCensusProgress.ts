import { and, eq, inArray, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { censusEvents, censusTasks, employees } from "@/schema";

export async function getCensusProgress(censusId: string) {
  const db = await getDb();

  const event = await db
    .select()
    .from(censusEvents)
    .where(eq(censusEvents.id, censusId))
    .get();
  if (!event) throw new Error("Census event not found");

  const tasks = await db
    .select({
      verifierId: censusTasks.verifierId,
      status: censusTasks.status,
    })
    .from(censusTasks)
    .where(eq(censusTasks.censusId, censusId))
    .all();

  const totalTasks = tasks.length;
  const respondedTasks = tasks.filter((t) => t.status !== "PENDING").length;

  const verifierIds = Array.from(
    new Set(tasks.map((t) => t.verifierId).filter((v): v is string => !!v)),
  );

  const verifierEmployees =
    verifierIds.length > 0
      ? await db
          .select({
            id: employees.id,
            firstName: employees.firstName,
            lastName: employees.lastName,
            email: employees.email,
          })
          .from(employees)
          .where(inArray(employees.id, verifierIds))
          .all()
      : [];

  const tasksByVerifier = new Map<string, Array<{ status: string }>>();
  for (const t of tasks) {
    if (!t.verifierId) continue;
    const list = tasksByVerifier.get(t.verifierId) ?? [];
    list.push({ status: t.status });
    tasksByVerifier.set(t.verifierId, list);
  }

  const verifierProgress = verifierEmployees.map((e) => {
    const list = tasksByVerifier.get(e.id) ?? [];
    const total = list.length;
    const responded = list.filter((t) => t.status !== "PENDING").length;
    return {
      employee: e,
      total,
      responded,
      done: total > 0 && responded >= total,
    };
  });

  const unassignedTasks = tasks.filter((t) => !t.verifierId).length;

  return {
    event: {
      id: event.id,
      name: event.name,
      scope: event.scope,
      startedAt: event.startedAt,
      closedAt: event.closedAt,
      createdAt: event.createdAt,
    },
    totalTasks,
    respondedTasks,
    unassignedTasks,
    verifierProgress,
  };
}

