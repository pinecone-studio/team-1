"use client";

type Role = "SUPER_ADMIN" | "IT_ADMIN" | "EMPLOYEE" | "FINANCE";

interface Props {
    currentRole: Role;
    onRoleChange: (role: Role) => void;
}

export default function DashboardRoleSwitcher({ currentRole, onRoleChange }: Props) {
    const roles: Role[] = ["SUPER_ADMIN", "IT_ADMIN", "EMPLOYEE", "FINANCE"];

    return (
        <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-xl w-fit border border-gray-200 dark:border-zinc-800 shadow-inner">
            {roles.map((role) => (
                <button
                    key={role}
                    onClick={() => onRoleChange(role)}
                    className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${currentRole === role
                            ? "bg-white dark:bg-zinc-700 text-purple-700 dark:text-purple-300 shadow-sm opacity-100"
                            : "text-gray-500 hover:text-gray-800 dark:hover:text-zinc-300 opacity-60 hover:opacity-100"
                        }
          `}
                >
                    {role.replace("_", " ")}
                </button>
            ))}
        </div>
    );
}
