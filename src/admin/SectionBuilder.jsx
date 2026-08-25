const SECTION_TYPES = ['p', 'h2', 'h3', 'ul', 'ol', 'callout', 'figure']

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function emptySection(type) {
  switch (type) {
    case 'h2':
    case 'h3':
      return { type, text: '', id: '' }
    case 'ul':
    case 'ol':
      return { type, items: [''] }
    case 'figure':
      return { type, src: '', alt: '', caption: '' }
    case 'callout':
    case 'p':
    default:
      return { type: type || 'p', text: '' }
  }
}

/**
 * Structured section editor matching BlogArticleBody types.
 */
export function SectionBuilder({ sections = [], onChange }) {
  const update = (next) => onChange(next)

  const setAt = (index, patch) => {
    update(sections.map((section, i) => (i === index ? { ...section, ...patch } : section)))
  }

  const move = (index, dir) => {
    const target = index + dir
    if (target < 0 || target >= sections.length) return
    const next = [...sections]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    update(next)
  }

  const remove = (index) => {
    update(sections.filter((_, i) => i !== index))
  }

  const add = (type) => {
    update([...sections, emptySection(type)])
  }

  return (
    <div className="admin-sections">
      <div className="admin-panel-head">
        <h2 className="admin-panel-title">Sections</h2>
        <div className="admin-actions admin-section-adders">
          {SECTION_TYPES.map((type) => (
            <button key={type} type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => add(type)}>
              + {type}
            </button>
          ))}
        </div>
      </div>

      {sections.length === 0 ? (
        <p className="admin-muted">No sections yet. Add a paragraph or heading to start.</p>
      ) : null}

      {sections.map((section, index) => (
        <div key={`${section.type}-${index}`} className="admin-section">
          <div className="admin-section-head">
            <span className="admin-section-type">
              {index + 1}. {section.type}
            </span>
            <div className="admin-actions">
              <button
                type="button"
                className="admin-btn admin-btn-ghost admin-btn-sm"
                onClick={() => move(index, -1)}
                disabled={index === 0}
              >
                Up
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-ghost admin-btn-sm"
                onClick={() => move(index, 1)}
                disabled={index === sections.length - 1}
              >
                Down
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger admin-btn-sm"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          </div>

          {section.type === 'p' || section.type === 'callout' ? (
            <div className="admin-field">
              <label>Text</label>
              <textarea
                value={section.text || ''}
                onChange={(e) => setAt(index, { text: e.target.value })}
              />
            </div>
          ) : null}

          {section.type === 'h2' || section.type === 'h3' ? (
            <>
              <div className="admin-field">
                <label>Heading</label>
                <input
                  value={section.text || ''}
                  onChange={(e) => {
                    const text = e.target.value
                    const id = section.id || slugify(text)
                    setAt(index, { text, id: section.id ? section.id : id })
                  }}
                  onBlur={() => {
                    if (!section.id && section.text) setAt(index, { id: slugify(section.text) })
                  }}
                />
              </div>
              <div className="admin-field">
                <label>Anchor id</label>
                <input
                  value={section.id || ''}
                  onChange={(e) => setAt(index, { id: slugify(e.target.value) })}
                  placeholder="auto from heading"
                />
              </div>
            </>
          ) : null}

          {section.type === 'ul' || section.type === 'ol' ? (
            <div className="admin-field">
              <label>Items</label>
              <div className="admin-items">
                {(section.items || ['']).map((item, itemIndex) => (
                  <div key={itemIndex} className="admin-item-row">
                    <input
                      value={item}
                      onChange={(e) => {
                        const items = [...(section.items || [])]
                        items[itemIndex] = e.target.value
                        setAt(index, { items })
                      }}
                    />
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost admin-btn-sm"
                      onClick={() => {
                        const items = (section.items || []).filter((_, i) => i !== itemIndex)
                        setAt(index, { items: items.length ? items : [''] })
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  onClick={() => setAt(index, { items: [...(section.items || []), ''] })}
                >
                  Add item
                </button>
              </div>
            </div>
          ) : null}

          {section.type === 'figure' ? (
            <>
              <div className="admin-field">
                <label>Image URL (src)</label>
                <input
                  value={section.src || ''}
                  onChange={(e) => setAt(index, { src: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Alt</label>
                <input
                  value={section.alt || ''}
                  onChange={(e) => setAt(index, { alt: e.target.value })}
                />
              </div>
              <div className="admin-field">
                <label>Caption</label>
                <input
                  value={section.caption || ''}
                  onChange={(e) => setAt(index, { caption: e.target.value })}
                />
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  )
}
