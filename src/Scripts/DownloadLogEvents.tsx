import { saveAs } from 'file-saver';

// Downloads the logged events from the browsers local storage
// Should be triggered at the end of an experiment
export default function DownloadLogEvents(filename:string){
    let test = localStorage.getItem("eventLog")
    if(test){
        const eventString = JSON.parse(test)
        //Download log as a file
        var file = new File([eventString], filename, {type: "text/csv;charset=utf-8"});
        saveAs(file);
    }
}