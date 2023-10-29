
import './App.css'
function App() {

    const checkSubstring = (startIndex: number, phoneNumber: string,inputNumber: string,substringStartIndex: number) => {
        let isSubstring = false;
        let endIndex = -1;
        for(let j = startIndex + 1; j < phoneNumber.length; j++) {
            if((phoneNumber[j] === '(' || phoneNumber[j] === ')' || phoneNumber[j] === '-' || phoneNumber[j] === ' ') && phoneNumber[j + 1] === inputNumber[substringStartIndex]) {
                console.log('checkSubstring ::', 'if part where symbol found', phoneNumber[j]);
            }
            else if(phoneNumber[j] === inputNumber[substringStartIndex]) {
                console.log('checkSubstring ::', 'else if part where string matched', phoneNumber[j]);
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
            }
        }
        return { endIndex: endIndex, isSubstring: isSubstring };
    }
    const getSubstringStartAndEndIndex = (phoneNumber: string, inputNumber: string) => {
        console.log(phoneNumber);
        let startIndex = -1;
        let endIndex = -1;
        let substringStartIndex = 0;
        for(let i = 0; i < phoneNumber.length; i++) {
            if(phoneNumber[i] === inputNumber[substringStartIndex]) {
                console.log('if part where first string matched', phoneNumber[i]);
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
            else {
                console.log('else part where first string not matched', phoneNumber[i]);
                substringStartIndex = 0;
            }
        }
        return { startIndex, endIndex }
    }

    const formatPhoneNumber = (phoneNumber: string, inputNumber: string) => {
        inputNumber= inputNumber.replace('(', '');
        inputNumber= inputNumber.replace(')', '');
        let indexResult = getSubstringStartAndEndIndex(phoneNumber, inputNumber);
        let foundIndex = indexResult.startIndex;
        let lastIndex = indexResult.endIndex;
        let result = [];
        console.log({foundIndex})

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
        console.log({ foundIndex })
        return <>{result}</>;
    };
    return (
        <>
            <main>
                { formatPhoneNumber('(123) 456-5663', '(656)') }
            </main>
        </>
    )
}

export default App
