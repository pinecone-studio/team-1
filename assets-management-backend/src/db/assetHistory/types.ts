export interface AssetTimelineEvent {
  id: string;
  eventType: string;
  description: string;
  /** internal — resolved to Employee by the GraphQL field resolver */
  actorId: string | null;
  timestamp: string;
}
