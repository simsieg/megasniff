const megasniff = (logger, prefix, suffix, value) => {
  let outputValue
  if (prefix == null && suffix == null) {
    outputValue = value
  } else {
    outputValue = (prefix != null ? `${prefix} ` : '') + value.toString() + (suffix != null ? ` ${suffix}` : '')
  }
  if (value instanceof Error) {
    logger.error(outputValue)
    throw value
  } else {
    logger.info(outputValue)
    return value
  }
}

module.exports = megasniff.bind(null, console, null, null)
module.exports.config = function (options = {}) {
  const { log, logger, prefix, suffix } = options
  const megasniffLogger = logger || log || console
  return megasniff.bind(null, megasniffLogger, prefix, suffix)
}
