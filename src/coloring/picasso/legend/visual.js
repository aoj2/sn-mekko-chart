export const legendShow = (legendProps, hc, coloring) => {
  if ((coloring.invalid || coloring.type === 'color')
    || (coloring.mode === 'measure' && hc.qMeasureInfo.length <= 1)
    || (coloring.mode === 'dimension')) {
    return false;
  }

  return legendProps.show !== false;
};

export function catLegend(componentConfig, opts) {
  const {
    key,
  } = componentConfig;

  const {
    scaleKey,
    scales,
    coloring,
    hc,
    permissions,
  } = opts;

  const s = `${scaleKey}Legend`;

  return {
    type: 'legend-cat',
    key: `${key}-cat`,
    scale: s in scales ? s : scaleKey,
    show: legendShow({}, hc, coloring),
    dock: 'right',
    settings: {
      item: {
        show: d => d.datum.value !== -2,
      },
      title: {
        wordBreak: 'break-word',
        maxLines: 2,
        text: coloring.label || '',
      },
      navigation: {
        disabled: permissions.indexOf('interact') === -1,
      },
    },
    brush: {
      consume: [{
        context: 'selection',
        data: ['', key],
        style: {
          inactive: {
            opacity: 0.3,
          },
        },
      }],
    },
  };
}

export default function legend(componentConfig, opts) {
  if (opts.coloring.type === 'categorical') {
    return catLegend(componentConfig, opts);
  }
  return false;
}
