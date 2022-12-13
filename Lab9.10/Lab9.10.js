window.onload = function() {

    let textArea = document.getElementById('textA');
    let Imag = document.getElementById("myimg");

    Imag.onmouseenter = function () {
        
        MoveObject(Imag);

    }

    textArea.onmouseenter = function () {

        MoveObject(textArea);

    }

    function MoveObject(objName){

        objName.onmousedown = function(event) {
        
            let coords = getCoords(objName);
            let shiftX = event.pageX - coords.left;
            let shiftY = event.pageY - coords.top;
            
            objName.style.position = 'absolute';
            document.body.appendChild(objName);

            moveAt(event);
            
            objName.style.zIndex = 1000;
        
            function moveAt(event) {

                objName.style.left = event.pageX - shiftX + 'px';
                objName.style.top = event.pageY - shiftY + 'px';

            }
            
            document.onmousemove = function(event) {

                moveAt(event);

            }
            
            objName.onmouseup = function() {

                document.onmousemove = null;
                objName.onmouseup = null;
                
            }
        
        }

        objName.ondragstart = function() {

            return false;

        };

    }


    function getCoords(elem) {

        let box = elem.getBoundingClientRect();

        return {

            top: box.top + scrollY,
            left: box.left + scrollX

        }

    }

    let moveForward = document.getElementById("moveForward");
    let step;

    moveForward.onclick = function() {

        step = moveForward.offsetLeft;
        moveForward.style.position = 'absolute';
        document.body.appendChild(moveForward);

    let timer = setInterval(function() {

        if (step > 1000) clearInterval(timer);
        else {

            step += 10;
            moveForward.style.left = step + "px";

        }
        
    }, 20);

    }

    let elementToMove = document.getElementById("moveCurved");
    let startPointX =  elementToMove.offsetLeft;
    let startPointY =  elementToMove.offsetTop;
    let currentPointX = startPointX;
    let currentPointY = startPointY;
    let endPointY = 100;
    let pathEndedX = false;
    let pathEndedY = false;
    let timer1, l = 0, isEnded = false;
    
    function Curve(elemToMove, yexpr, x0, y0, s){
        
        elemToMove.style.top = (y0 + eval(yexpr));
        elemToMove.style.left = (x0 + x * 20);
        
        if (l > s && s > 0) isEnded = true;
        else if (isEnded && l == 0) clearInterval(timer1);
        if(isEnded){

            x -= 1;
            l--;
            
        }
        else{
            
            x += 1;
            l++;
            
        } 
        
    }
    
    elementToMove.onclick = function() {
        
        elementToMove.style.position = 'absolute';
        document.body.appendChild(elementToMove);
        
        l = 0, isEnded = false;
        //Движение по кривой продвинутый вариант
        timer1 = setInterval(function (){
            
            Curve(elementToMove, "Math.sin(x) * 10", startPointX, startPointY, 50)
            
        }, 20)
        
        // Движение по кривой
        // let countOfBend = Number(prompt("Введите кол-во переломов"));
        // let bend = countOfBend;
        //     let timer = setInterval(function() {
            
            //         if (currentPointY + 2 <= startPointY && bend == 0) {
                
                //             bend = countOfBend + 1;
                //             pathEndedX = true;
                
                //         }
                
                //         if (bend > 0){
                    
    //             if(currentPointY <= startPointY) {

    //                 pathEndedY = false;
    //                 bend--;
                    
    //             }

    //         }

    //         if (pathEndedX) currentPointX += -5;
    //         if (currentPointY + 2 <= endPointY) {

    //             if (!pathEndedX) currentPointX += 5;

    //         }

    //         if(currentPointX == startPointX) {

    //             pathEndedX = false;
    //             clearInterval(timer);

    //         }

            
    //         if (currentPointY + 2 >= endPointY) {

    //                 pathEndedY = true;

    //         }

    //         if (pathEndedY) currentPointY += -6;
    //         if (currentPointY + 2 <= endPointY){

    //             if (!pathEndedY) currentPointY += 6;

    //         }
               
    //         elementToMove.style.top = currentPointY + "px";
    //         elementToMove.style.left = currentPointX + "px";

    //         endTemp = elementToMove.offsetLeft;
    //         console.log(endTemp);

    // }, 20);

    }

    let func = document.getElementsByName("function");
    let colorOfF = document.getElementById("colorOfF");
    let B = document.getElementById("Draw");
    let inputMethod = document.getElementsByName("drawFunc");
    
    let yF = 'Math.pow(x, 2)';
    let dotColor = 'Images/blackDot.png';
    let clinewidth = '', xstr = '', xstr0 = '';

    let x = 0, i = 0;
    let draw = true;

    let Timer;

    function staticCurve(pict, yexpr, x0, y0, t, n, s){
        
        /* pict - имя графического файла
        
        yexpr - выражение с переменной х
        
        х0, у0 - координаты начала кривой
        
        t - количество точек кривой (значений переменной х)
        
        n - толщина линии
        
        s - длина штриха и паузы */
        
        if (!yexpr) return null;
        if (!pict) pict = dotColor;
        if (!s) s = 0;
        if (!t) t = 0;
        
        
        clinewidth = 'width=' + n + ' height=' + n;
        
        xstr0 = '<img src="' + pict +'"' + clinewidth + ' style = "position:absolute; top: ';
        
        for(x = -1 * t/2; x <= t/2; x+=0.01) {
            
            if (draw) xstr += xstr0 + (y0 + eval(yexpr)) + 'px; left:' + (x0 + x * 20)+'">';
        
            if (i > s && s > 0) {

                draw = !draw;
                i = 0;

            }
                
            i++;
            
        }
        
        document.write (xstr);

    }
    
    function dinamicCurve(pict, yexpr, x0, y0, t, n, s){
            
        if (!yexpr) return null;
        if (!pict) pict = dotColor;
        if (!s) s = 0;
        if (!t) t = 0;
            
        clinewidth = 'width=' + n + ' height=' + n;
            
            
        xstr0 = '<img src="' + pict +'"' + clinewidth + ' style = "position:absolute; top: ';
            
        x+=0.01;
            
        if (draw) xstr += xstr0 + (y0 + eval(yexpr)) + 'px; left:' + (x0 + x * 20)+'">';
            
        if (i > s && s > 0 || x >= t / 2 ) {
                
            clearInterval(Timer);
                
        }
                
        i++;
            
        document.write (xstr);

    }
    B.onclick = function() {
                
        for (let key = 0; key < func.length; key++) {
            
            if (func[key].checked){

                if (func[key].value == "y = x^2") yF = 'Math.pow(x, 2)';
                if (func[key].value == "y = x^3") yF = 'Math.pow(x, 3)';
                if (func[key].value == "y = sin(x)") yF = 'Math.sin(x)';
                if (func[key].value == "y = cos(x)") yF = 'Math.cos(x)';

            }

        }

        for (let key = 0; key < colorOfF.length; key++) {

            if (colorOfF[key].selected){

                if (colorOfF[key].value == "black") dotColor = 'Images/blackDot.png';
                if (colorOfF[key].value == "red") dotColor = 'Images/redDot.png';
                if (colorOfF[key].value == "blue") dotColor = 'Images/blueDot.png';

            }

        }

        if (inputMethod[0].checked) staticCurve(dotColor, yF + "* 10", 200, 150, 5, 5, 1000);
        else if (inputMethod[1].checked) {

        x = -1 * 10 / 2 - 0.02;

        Timer = setInterval(function (){

            dinamicCurve(dotColor, yF + "* 10", 200, 150, 10, 5, 1000);

        }, 1)

        }

    }

}