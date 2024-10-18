"use client"

import React, {
  useEffect,
  useState,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DrupalTaxonomyTerm } from "next-drupal"
import "@/styles/article-listing-filter.css"

interface ArticlesFilterFormProps {
  typeOptions: DrupalTaxonomyTerm[]
  topicOptions: DrupalTaxonomyTerm[]
}

export default function ArticlesFilterForm({
  typeOptions,
  topicOptions,
}: ArticlesFilterFormProps) {
  const filterParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [activeType, setActiveType] = useState("All")
  const [activeTopic, setActiveTopic] = useState("All")

  useEffect(() => {
    const typeParam = filterParams.get("type")
    const topicParam = filterParams.get("topic")

    if (typeParam) {
      setActiveType(typeParam)
    }
    if (topicParam) {
      setActiveTopic(topicParam)
    }
  }, [filterParams])

  function handleArticlesFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams(filterParams)
    setActiveType("All")
    params.delete("type")
    setActiveTopic("All")
    params.delete("topic")
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  async function handleRadioChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldType: string
  ) {
    const params = new URLSearchParams(filterParams)
    const target = e.currentTarget

    if (target.checked == true) {
      if (fieldType == "type") {
        setActiveType(target.value)
        params.set("type", target.value)
      } else if (fieldType == "topic") {
        setActiveTopic(target.value)
        params.set("topic", target.value)
      }
      target.closest(".fieldset-wrapper")?.classList.remove("active")
      const radios = target.closest(".form-radios")! as HTMLElement
      radios.style.display = "none"

      replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <div className="article-listing-filter-wrapper">
      <div className="container">
        <div className="filter_wrapper">
          <div className="filter-label">Filter By</div>
          <form onSubmit={handleArticlesFilterSubmit}>
            <FilterFieldGroup
              legend="Type"
              activeValue={activeType}
              handleRadioChange={handleRadioChange}
              fieldName="type"
              options={typeOptions}
            />
            <FilterFieldGroup
              legend="Topic"
              activeValue={activeTopic}
              handleRadioChange={handleRadioChange}
              fieldName="topic"
              options={topicOptions}
            />
            <div
              className="form-actions js-form-wrapper form-wrapper"
              id="edit-actions"
            >
              {/* <input
                className="button js-form-submit form-submit"
                data-drupal-selector="edit-submit-articles-listing"
                name="submit-filters"
                type="submit"
                id="edit-submit-articles-listing"
                value="Apply"
              /> */}
              <input
                data-drupal-selector="edit-reset-articles-listing"
                type="submit"
                id="edit-reset-articles-listing"
                name="reset"
                value="Reset"
                className="button js-form-submit form-submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function handleSelect(e: React.MouseEvent<HTMLElement>) {
  const dropdownWrapper = e.currentTarget
  if (dropdownWrapper.classList.contains("active")) {
    dropdownWrapper.classList.remove("active")
    const radios = dropdownWrapper.querySelector(".form-radios")! as HTMLElement
    radios.style.display = "none"
  } else {
    dropdownWrapper.classList.add("active")
    const radios = dropdownWrapper.querySelector(".form-radios")! as HTMLElement
    radios.style.display = "block"
  }
}

interface FilterFieldGropProps {
  legend: string
  fieldName: string
  activeValue: string
  handleRadioChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void
  options: DrupalTaxonomyTerm[]
}

function FilterFieldGroup({
  legend,
  fieldName,
  activeValue,
  handleRadioChange,
  options,
}: FilterFieldGropProps) {
  let activeLabel = "All"
  if (document) {
    activeLabel = document.querySelector<HTMLInputElement>(
      `input[value="${activeValue}"]`
    )?.labels![0].textContent as string
  }

  return (
    <fieldset className="fieldgroup">
      <legend>
        <span className="fieldset-legend">{legend}</span>
      </legend>
      <div className="fieldset-wrapper" onClick={(e) => handleSelect(e)}>
        <div id={`edit-${fieldName}`}>
          <span
            className="selected selected-type"
            tabIndex={0}
            role="button"
            aria-label="Select the topic for the Article"
          >
            {activeValue === "All" ? "All" : activeLabel}
          </span>
          <div className="form-radios form--inline">
            <div
              className={`form-type-radio ${activeValue === "All" ? "active" : ""}`}
              tabIndex={0}
              data-once="keypressradio clickradio"
            >
              <input
                type="radio"
                id={`edit-${fieldName}-all`}
                name={fieldName}
                value="All"
                className="form-radio"
                checked={activeValue === "All"}
                onChange={(e) => handleRadioChange(e, fieldName)}
              />
              <label htmlFor={`edit-${fieldName}-all`} className="option">
                All
              </label>
            </div>
            {options.map((option) => (
              <div
                className={`form-type-radio ${activeValue === option.drupal_internal__tid ? "active" : ""}`}
                tabIndex={0}
                key={option.id}
              >
                <input
                  type="radio"
                  id={`edit-${fieldName}-${option.drupal_internal__tid}`}
                  name={fieldName}
                  value={option.drupal_internal__tid}
                  className="form-radio"
                  checked={activeValue === option.drupal_internal__tid}
                  onChange={(e) => handleRadioChange(e, fieldName)}
                />
                <label
                  htmlFor={`edit-${fieldName}-${option.drupal_internal__tid}`}
                >
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </fieldset>
  )
}
