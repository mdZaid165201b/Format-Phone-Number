
import './App.css'
function App() {

    const checkSubstring = (startIndex: number, phoneNumber: string,inputNumber: string,substringStartIndex: number) => {
        let isSubstring = false;
        let endIndex = -1;
        for(let j = startIndex + 1; j < phoneNumber.length; j++) {
            console.log('substringStartindex ----', substringStartIndex);
            console.log('j index ----', j);

            if((phoneNumber[j] === '(' || phoneNumber[j] === ')' || phoneNumber[j] === '-' || phoneNumber[j] === ' ') && phoneNumber[j + 1] !== inputNumber[substringStartIndex]) {
                if(phoneNumber[j + 1] === ' ') {
                    continue;
                }
                if(Number.isInteger(parseInt(phoneNumber[j + 1])) && (phoneNumber[j + 1] !== inputNumber[substringStartIndex])) continue;
                console.log('checkSubstring ::', 'if part where symbol found', phoneNumber[j]);
                console.log(phoneNumber[j + 1], j + 1, 'j + 1')
                // return { endIndex: -1, isSubstring: false };
                console.log('substringStartIndex --->', substringStartIndex)
                if(substringStartIndex === inputNumber.length) {
                    console.log('checkSubstring ::', 'inside if with nested if where substringlength === inputNumberlength', substringStartIndex, inputNumber.length, phoneNumber[j]);
                    isSubstring = true;
                    endIndex = j - 1;
                    break;
                }
                else {
                    console.log('checkSubstring ::', 'inside if with nested else where substringlength !== inputNumberlength', substringStartIndex, inputNumber.length, phoneNumber[j]);
                    isSubstring = false;
                    endIndex = -1;
                    break;
                }
            }
            else if(phoneNumber[j] === inputNumber[substringStartIndex]) {
                console.log('checkSubstring ::', 'else if part where string matched', phoneNumber[j]);
                console.log('matched string substringStartIndex -------------', substringStartIndex);
                if(phoneNumber.length - 1 === j) {
                    console.log('inside phoneNumber.length - 1 === j');
                    substringStartIndex++;
                    if(substringStartIndex === inputNumber.length) {
                        console.log('inside phoneNumber.length - 1 === j')
                        console.log('checkSubstring ::', 'else if part inside matched strings', phoneNumber[j]);
                        console.log('j - 1', j - 1);
                        isSubstring = true;
                        endIndex = j;
                        break;
                    }
                }

                substringStartIndex++;
            }
            else if((phoneNumber[j] !== '(' || phoneNumber[j] !== ')' || phoneNumber[j] !== '-' || phoneNumber[j] !== ' ') && phoneNumber[j] !== inputNumber[substringStartIndex]) {
                console.log('checkSubstring ::', 'else if part where no string matched',phoneNumber[j]);

                if(substringStartIndex === inputNumber.length) {
                    console.log('checkSubstring ::', 'if part inside matched strings', phoneNumber[j]);
                    isSubstring = true;
                    endIndex = j - 1;
                    break;
                }
                else if(Number.isInteger(parseInt(phoneNumber[j])) && (phoneNumber[j] !== inputNumber[substringStartIndex])) {
                    console.log('hello from else if ')
                    isSubstring = false;
                    endIndex = -1;
                    break;
                }
            }

        }
        console.log(endIndex, 'checkSubstring.....')
        return { endIndex: endIndex, isSubstring: isSubstring };
    }
    const getSubstringStartAndEndIndex = (phoneNumber: string, inputNumber: string) => {
        console.log(phoneNumber, 'inputNumber', inputNumber);
        let startIndex = -1;
        let endIndex = -1;
        let substringStartIndex = 0;
        for(let i = 0; i < phoneNumber.length; i++) {
            if(phoneNumber[i] === inputNumber[substringStartIndex]) {
                console.log('if part where first string matched',i, phoneNumber[i]);
                substringStartIndex++;
                console.log('found at index:', i);
                startIndex = i;
                let substringResult = checkSubstring(i,  phoneNumber,inputNumber,substringStartIndex);
                console.log({substringResult});
                if(substringResult.isSubstring) {
                    console.log('if part where substring found');
                    startIndex = i;
                    endIndex = substringResult.endIndex;
                    break;
                }
                else {
                    startIndex = -1;
                    endIndex = -1;
                    substringStartIndex = 0;
                }
            }
        }
        console.log(startIndex, endIndex, 'getStarttAndEndIndex')
        return { startIndex, endIndex }
    }


    const formatPhoneNumber = (phoneNumber: string, inputNumber: string) => {
        inputNumber = inputNumber.replace(' ', '');
        inputNumber= inputNumber.replace('(', '');
        inputNumber= inputNumber.replace(')', '');
        inputNumber= inputNumber.replace('-', '');
        if(inputNumber.trim().length > phoneNumber.trim().length) {
            alert('Error, Number can not be more than Original Number!!!');
        }

        let result = [];
        if(phoneNumber === inputNumber.trim()) {
            for(let i = 0; i < phoneNumber.length; i++) {
                result.push(
                    <span key={i} style={{ color: "red" }}>{phoneNumber[i]}</span>
                );
            }
        }
        else {
            inputNumber = inputNumber.replace(' ', '');
            inputNumber= inputNumber.replace('(', '');
            inputNumber= inputNumber.replace(')', '');
            inputNumber= inputNumber.replace('-', '');
            let indexResult = getSubstringStartAndEndIndex(phoneNumber, inputNumber);
            let foundIndex = indexResult.startIndex;
            let lastIndex = indexResult.endIndex;
            for (let i = 0; i < phoneNumber.length; i++) {
                if(i >= foundIndex && i <= lastIndex) {
                    if (phoneNumber[i] === '(' || phoneNumber[i] === ')' || phoneNumber[i] === '-' || phoneNumber[i] === ' ') {
                        console.log('inside if in the else ')
                        result.push(
                            <span key={i}>{phoneNumber[i]}</span>
                        );
                    } else {
                        console.log('inside else in the else ')
                        result.push(
                            <span key={i} style={{ color: "red" }}>{phoneNumber[i]}</span>
                        );
                    }
                }
                else {
                    result.push(
                        <span key={i}>{phoneNumber[i]}</span>
                    );
                }
            }
        }
        return <>{result}</>;
    };
    return (
        <>
            <main>
                { formatPhoneNumber('(123) 456-5663', '(345) (656)-6-3 ') }
            </main>
        </>
    )
}

export default App
