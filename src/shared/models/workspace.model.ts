export interface WorkspaceDto {
  _id: string;
  title: string;
  category: "Scrum" | "Custom";
  googleCalendarLink?: string;
  members?: any[];
  sections: SectionDto[];
}

export interface SectionDto {
  _id: string;
  title: string;
   
}
