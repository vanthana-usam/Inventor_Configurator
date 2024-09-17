 

// compute text width from canvas
// don't want to test string width calc:
/* istanbul ignore next */

export function getMaxColumnTextWidth(strings) {
    const font = "13px ArtifaktElement, sans-serif";
    const canvas = document.createElement("canvas");
    const context2d = canvas.getContext("2d");
    context2d.font = font;
    let maxWidth = 0;
    strings.forEach(element => {
      const width = context2d.measureText(element).width;
      maxWidth = width>maxWidth ? width : maxWidth;
    });

    // round to 10 times number, like 81.5 -> 90, 87.1 -> 90, etc
    const roundTo = 10;
    const rounded = (maxWidth % roundTo==0) ? maxWidth : maxWidth-maxWidth%roundTo + roundTo;
    return rounded;
  }