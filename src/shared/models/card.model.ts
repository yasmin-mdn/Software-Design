export type CardStatus = "Open" | "In Progress" | "In Review" | "Complete";

export interface CardDto {
  sectionId?: string;
  id: string;
  title: string;
  description?: string;
  assignees?: any[];
  dueDate?: string;
  priority?: boolean;
  status?: CardStatus;
  labels?: string[];
}

export interface CardGroupDto {
  status: CardStatus;
  cards: CardDto[];
  color?: "card-open" | "card-in-progress" | "card-in-review" | "card-complete";
}

export interface CardsDto {
  workspaceId: string;
  cardGroups: CardGroupDto[];
}
