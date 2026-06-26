const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
        headless: 'new'
    });

    const page = await browser.newPage();

    await page.goto('file:///home/ovigue/Documents/portfolio/ovigue_cv_html_doc.html', {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    // Wait for Google Fonts to load
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 2000));

    await page.pdf({
        path: '/home/ovigue/Documents/portfolio/Ovigue_Leonard_Eguriase_Software_Developer_Resume.pdf',
        format: 'A4',
        printBackground: false,
        displayHeaderFooter: false,
        headerTemplate: '<span></span>',
        footerTemplate: '<span></span>',
        margin: {
            top: '0.55in',
            right: '0.6in',
            bottom: '0.55in',
            left: '0.6in'
        },
        preferCSSPageSize: false,
        tagged: true
    });

    console.log('PDF generated successfully!');
    
    // Verify page count
    const pdfBuffer = require('fs').readFileSync('/home/ovigue/Documents/portfolio/Ovigue_Leonard_Eguriase_Software_Developer_Resume.pdf');
    const pageCount = (pdfBuffer.toString().match(/\/Type\s*\/Page\b/g) || []).length;
    console.log(`Pages: ${pageCount}`);
    console.log(`Size: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);
    
    await browser.close();
})();
