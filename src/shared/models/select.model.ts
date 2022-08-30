export type SelectType = "GROUP" | "ITEM";

export interface SelectDto {
  title: string;
  value: string;
  type: SelectType;
}
