const { jsPDF } = require("jspdf");
const Paragraph = require("./paragraph.js");
module.exports = class {
    constructor(obj) {
        this.title = obj.title;
        this.user = obj.user;
        this.instructor = obj.instructor;
        this.course = obj.course;
        this.duedate = obj.duedate;
        this.paragraphs = [];
    }
    addParagraph(paragraph, callback){
        if(paragraph instanceof Paragraph){
            this.paragraphs.push(paragraph.text);
            if (callback) callback(undefined, "Successfully pushed paragraph into document");
        }else{
            if (callback) callback("Paragraph must be instance of class Paragraph");
        }
    }
    export(path) {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'in',
            format: 'letter',
            lineHeight: 2.25
        });
        doc.setFontSize(12);
        doc.setFont("Times", "Roman");
        doc.page=1;
        function addPageNumber(user){ 
            doc.text(`${user.split(" ").slice(-1)} ${doc.page}`, 7.5, 0.5+6/72, "right");
            doc.page ++;
        };
        addPageNumber(this.user);
        var header = `${this.user}\n${this.instructor}\n${this.course}\n${this.duedate}`;
        var header = doc.splitTextToSize(header, 6.5);
        doc.text(header, 1, 1);
        doc.text(this.title, 4.25, 1+(4*2.25*12/72), "center");
        var text = "\t";
        for(let i=0;i<this.paragraphs.length;i++){
            text += `${this.paragraphs[i]}\n\t`
        }
        text = doc.splitTextToSize(text, 6.5);
        var Text = [[]];
        for(let i=0;i<text.length;i++){
            if(Text.length == 1){
                if(Text[0].length < 19){
                    Text[0].push(text[i]);
                }else{
                    Text.push([text[i]]);
                }
            }else if(Text.slice(-1).length<3){
                Text[Text.length - 1].push(text[i]);
            }else{
                Text.push([text[i]]);
            }
        }
        for(let i=0;i<Text.length;i++){
            if(i==0){
                doc.text(Text[0], 1, 1+(5*2.25*12/72));
            }else{
                doc.addPage();
                addPageNumber(this.user);
                doc.text(Text[i], 1, 1);
            }
        }
        doc.save(path);
    }
};