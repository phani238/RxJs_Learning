// import 'rxjs/Rx'
import { Observable, fromEvent } from "rxjs";
import { map, filter, delay, mergeMap, retry, retryWhen, scan } from 'rxjs/operators';

let output = document.getElementById("output");
let button = document.getElementById("button");
let click = fromEvent(button, "click");

// .pipe(
//     map((e: MouseEvent) => {
//         return {
//             x: e.clientX,
//             y: e.clientY
//         }
//     }), filter(value => value.x < 500))
//     .pipe(delay(300));

// .pipe(map<number, number>(n => n * 2), filter(n => +n > 4));

// function onNext(value) {
//     circle.style.left = value.x;
//     circle.style.top = value.y;
// }

function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();
        if (xhr.status == 0) {
            xhr.addEventListener("load", () => {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            })
            xhr.open("GET", url, true);
            xhr.send()
        } else {
            observer.error(xhr.responseText);
        }
    }).pipe(retryWhen(retryStrategy()));
}

function loadWithFetch(url: string) {
    
}

function retryStrategy() {
    return function (errors) {
        return errors
            // .pipe(scan(acc,errors) ==> {
            //     console.log(acc, value);
            // }, 10)
            .pipe(delay(1000));
    }
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// load("movies.json").subscribe(renderMovies);

click.pipe(mergeMap(e => load(`movies.json`)))

    .subscribe(
        // onNext,
        // value => console.log(value),

        // e => load("movies.json"),

        renderMovies,
        e => console.log(`error:${e}`),
        () => console.log("complete")
    );

