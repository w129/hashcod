(function (global) {
  const requirePdfLib = () => {
    if (!global.PDFLib || !global.PDFLib.PDFDocument) {
      throw new Error('pdf_lib_unavailable');
    }
    return global.PDFLib;
  };

  const sha256 = async (bytes) => {
    const digest = await global.crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const signatureCoordinates = (page, position, width, height) => {
    const margin = 36;
    const size = page.getSize();
    return {
      'bottom-left': [margin, margin],
      'bottom-right': [size.width - margin - width, margin],
      'top-left': [margin, size.height - margin - height],
      'top-right': [size.width - margin - width, size.height - margin - height],
    }[position] || [size.width - margin - width, margin];
  };

  async function signPdf(options) {
    const {
      sourceBytes,
      signer = 'Hashcod signer',
      signatureText = signer,
      signaturePng = '',
      pageIndex = 0,
      position = 'bottom-right',
      timestamp = new global.Date().toISOString(),
    } = options || {};
    if (!sourceBytes) throw new Error('source_pdf_required');
    const { PDFDocument, StandardFonts, rgb } = requirePdfLib();
    const pdf = await PDFDocument.load(sourceBytes);
    const pages = pdf.getPages();
    const page = pages[Math.max(0, Math.min(pages.length - 1, Number(pageIndex) || 0))];
    const font = await pdf.embedFont(StandardFonts.HelveticaOblique);
    const metaFont = await pdf.embedFont(StandardFonts.Helvetica);
    const sourceDigest = await sha256(sourceBytes);
    const width = 220;
    const height = signaturePng ? 92 : 66;
    const [x, y] = signatureCoordinates(page, position, width, height);
    page.drawRectangle({ x, y, width, height, borderWidth: 1.2, borderColor: rgb(0, 0, 0) });
    if (signaturePng) {
      const image = await pdf.embedPng(signaturePng);
      const scaled = image.scaleToFit(width - 18, 38);
      page.drawImage(image, { x: x + 9, y: y + height - scaled.height - 10, width: scaled.width, height: scaled.height });
    } else {
      page.drawText(signatureText || signer, { x: x + 10, y: y + 38, size: 17, font, color: rgb(0, 0, 0) });
    }
    page.drawText(`Signed by ${signer}`.slice(0, 54), { x: x + 10, y: y + 20, size: 8, font: metaFont, color: rgb(0, 0, 0) });
    page.drawText(timestamp.slice(0, 19), { x: x + 10, y: y + 8, size: 7, font: metaFont, color: rgb(0, 0, 0) });
    pdf.setProducer('Hashcod DocuSeal Tool');
    pdf.setCreator('Hashcod DocuSeal Tool');
    pdf.setSubject(`Visible electronic signature | source SHA-256 ${sourceDigest}`);
    pdf.setModificationDate(new global.Date(timestamp));
    return { bytes: await pdf.save(), sourceDigest, timestamp };
  }

  global.HashcodDocuSealAdapter = { signPdf, sha256 };
})(window);
