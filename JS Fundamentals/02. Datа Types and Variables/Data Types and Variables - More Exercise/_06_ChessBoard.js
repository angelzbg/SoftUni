(n) => {
    let html = '<div class="chessboard">';
    for(let i=1; i<=n; i++) {
        html += '\n  <div>';
        for(let j=1; j<=n; j++) {
            html += `\n    <span class="${ i%2===1 && j%2===1 || i%2===0 && j%2===0 ? 'black' : 'white'}"></span>`;
        }
        html += '\n  </div>';
    }
    html += '\n</div>';
    console.log(html);
}