import CardGroup from "./CardGroup";
import { CardGroupDto, CardsDto, get$, useApi } from "../../../shared";
import { useEffect } from "react";

const getCards = (sectionId: string) => {
  return get$("card", [{ key: "section_id", value: sectionId }]);
};

export default function CardLayout({ sectionId, workspaceId }: any) {
  const [getC, response] = useApi<CardsDto>(
    getCards,
    { cardGroups: [], workspaceId } as CardsDto,
    {
      convertor: (data: any) => {
        let result: CardsDto = { workspaceId, cardGroups: [] };
        data.forEach((card: any) => {
          card.id = card._id;
          if (result.cardGroups.find((i) => i.status === card.status)) {
            result.cardGroups
              .find((i) => i.status === card.status)
              ?.cards.push(card);
          } else {
            result.cardGroups.push({
              status: card.status,
              color: ("card-" +
                (card.status as string).toLowerCase().replace(" ", "-")) as any,
              cards: [card],
            });
          }
        });
        if (result.cardGroups.length === 0) {
          return {
            ...result,
            cardGroups: [
              {
                status: "Open",
                color: "card-open",
                cards: [],
              },
            ],
          };
        } else return result;
      },
    }
  );

  useEffect(() => {
    getC(sectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  return (
    <div className="w-full h-full overflow-x-auto">
      {/* Box */}
      {response.cardGroups.map((group: CardGroupDto) => (
        <CardGroup
          workspaceId={workspaceId}
          key={group.status}
          group={group}
          sectionId={sectionId}
          onReload={() => {
            getC(sectionId);
          }}
        ></CardGroup>
      ))}
    </div>
  );
}
