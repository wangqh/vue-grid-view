
export function setTransform(top, left, width, height) {
  // Replace unitless items with px
  const translate = "translate3d(" + left + "px," + top + "px, 0)";
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: width + "px",
    height: height + "px",
    position: 'absolute'
  };
}

export function setTopLeft(top, left, width, height) {
    return {
        top: top + "px",
        left: left + "px",
        width: width + "px",
        height: height + "px",
        position: 'absolute'
    };
}

/**
 * Validate a view. Throws errors.
 *
 * @param  {Array}  view        Array of view items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */
export function validateView(view, contextName) {
  contextName = contextName || "View";
  const subProps = ['x', 'y', 'w', 'h'];
  if (!Array.isArray(view)) throw new Error(contextName + " must be an array!");
  for (let i = 0, len = view.length; i < len; i++) {
    const item = view[i];
    for (let j = 0; j < subProps.length; j++) {
      if (typeof item[subProps[j]] !== 'number') {
        throw new Error('VueGridView: ' + contextName + '[' + i + '].' + subProps[j] + ' must be a number!');
      }
    }
  }
}









