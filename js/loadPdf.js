/**
 * Created by Limbo on 2017/8/15.
 */
var url='../../3.pdf';
// The workerSrc property shall be specified.
PDFJS.workerSrc = '../../js/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = PDFJS.getDocument(url);

window.addEventListener("resize", function () {
    pdfCanvas();
});

pdfCanvas();

function pdfCanvas() {
    loadingTask.promise.then(function(pdf) {
        // console.log('PDF loaded');

        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function(page) {
            // console.log('Page loaded');


            var width = document.body.clientWidth;
            var num=width/1920;
            var scale = 2/0.6578125*num;

            var viewport = page.getViewport(scale);
            // console.log(viewport);

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');


            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // 清除画布
            context.clearRect(0, 0, viewport.width,viewport.height);

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.then(function () {
                // console.log('Page rendered');
            });
        });
    }, function (reason) {
        console.error(reason);
    });
}
