import { DrupalParagraph } from "next-drupal"
import "./impactstate.css"

interface ImpactStatsProps {
  data: DrupalParagraph
}

function ImpactStats({ data }: ImpactStatsProps) {
  return (
    <div className="impactstate_component_wrapper paragraph--type--impact-stats">
      <div className="component__wrapper">
        <div className="impactstate_top_wrapper">
          {data.field_heading && (
            <div className="title">{data.field_heading}</div>
          )}
          {data.field_description && (
            <div
              className="des richtext"
              dangerouslySetInnerHTML={{
                __html: data.field_description?.processed,
              }}
            ></div>
          )}
          {data.field_impact_stats_items && (
            <ImpactStatsItems stats_items={data.field_impact_stats_items} />
          )}
        </div>
      </div>
    </div>
  )
}

interface ImpactStatsItemsProps {
  stats_items: DrupalParagraph[]
}

function ImpactStatsItems({ stats_items }: ImpactStatsItemsProps) {
  const itemCount = stats_items.length
  return (
    <div className={`state_item_wrapper num_of_state_${itemCount}`}>
      {stats_items.map((item) => (
        <div className="state__item" key={item.id}>
          <div className="state_title">{item.field_heading}</div>
          <div className="state_caption">{item.field_caption_text}</div>
        </div>
      ))}
    </div>
  )
}

export default ImpactStats
