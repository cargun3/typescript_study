import Item from "./types/Item";
import DashBoardItem from "./types/dashboardItem";

export function getItemTemplate(arr: Item[]): string {

    let html = [];
    for(let i = 0; i < arr.length; i++) {
        html.push(`
            <div class="col-xs-4 max50">
                <h2>${arr[i].title}</h2>
                <p>${arr[i].intro}</p>
                <p><a href="${arr[i].url}" target="_blank " class="btn btn-link">바로가기 &raquo;</a></p>
            </div>`
        );
    }
    return html.join("");
}

export function getDashBoardItemTemplate(arr: DashBoardItem[]): string {
    
    let html=[];
    for(let i = 0; i < arr.length; i++) {
        html.push(`
            <li>
                <span class="tit">${arr[i].title}</span>
                <span class="num">${arr[i].count}건</span></li>
            </li>`
        );
    }
    return html.join("");

}

export function getDashBoardItemTemplate2(resultMap: Map<string, DashBoardItem[]>): Map<string, string> {
    
    let resultHtml = new Map<string, string>();
    let html=[];
    

    for(let i = 0; i < resultMap.get('inspectionStatus').length; i++) {
        html.push(`
            <li>
                <span class="tit">${resultMap.get('inspectionStatus')[i].title}</span>
                <span class="num">${resultMap.get('inspectionStatus')[i].count}건</span></li>
            </li>`
        );
    }
    
    resultHtml.set("inspectionStatus", html.join(""));

    html=[];
    // for(let i = 0; i < resultMap.get('inspectionStatus2').length; i++) {
        html.push(`
        <li>
            <strong class="tit">확진환자</strong> 
            <span class="num">
                <span class="mini">(누적)</span>${resultMap.get('inspectionStatus2')[0].count}
            </span> 
            <span class="before">전일대비(+ 25)</span>
        </li>
        
        <li>
            <em class="sign">=</em> 
            <strong class="tit">완치<br>
                <span class="mini_tit">(격리해제)</span>
            </strong> 
            <span class="num">7,447</span>
            <span class="before">(+ 79)</span>
        </li>
        <li>
            <em class="sign">+</em> 
            <strong class="tit">치료중<br>
                <span class="mini_tit">(격리 중)</span>
            </strong> 
            <span class="num">2,873</span> 
            <span class="before">(-57)</span> 
            <a class="help" id="liveNum_help" href="">?</a>
        </li>
        <li><em class="sign">+</em> <strong class="tit">사망</strong>
            <span class="num">217</span> <span class="before">(+ 3)</span>
        </li>`
        );
    // }
    
    resultHtml.set("inspectionStatus2", html.join(""));
    
    return resultHtml;

}