function WS(num) {
    return "&nbsp;".repeat(num);
}
class Code_Writer {
    constructor(arr) { this.arr = arr; }
    write(a) { this.arr.push(a); }
    writeln(a) { this.arr.push(a + "<br>"); }
}
class Simple_Code_Writer extends Code_Writer {
    constructor(arr) { super(arr); }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    getRandomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    write_code_block(hasError, lines) {
        let error_pos = -1;
        //this.write("<td style='border: 1px solid black;'>");
        if (hasError) {
            error_pos = this.getRandomInt(lines.length);
        }
        lines.forEach((line, index) => {
            console.log("this is the line:", line);
            if (index === error_pos) {
                const randIndex = this.getRandomInt(line.length + 1);
                line = line.slice(0, randIndex) + "!" + line.slice(randIndex);
            }
            line = line.replace("<", "&lt;").replace(">", "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        //this.write("</td>");
    }
    getRandomActionNameOld(count) {
        const chars = ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];
        if (count > chars.length)
            throw new Error('Too many requested characters');
        return this.fisherYatesShuffle(chars).slice(0, count);
    }
    getRandomActionName(count, states) {
        const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];
        // Filter out any chars that are in states
        const availableChars = chars.filter(char => !states.includes(char));
        if (count > availableChars.length)
            throw new Error('Too many requested characters');
        return this.fisherYatesShuffle(availableChars).slice(0, count);
    }
    getRandomStateName(count) {
        const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u'];
        if (count > chars.length)
            throw new Error('Too many requested characters');
        return this.fisherYatesShuffle(chars).slice(0, count);
    }
    // avoids bias when shuffling
    fisherYatesShuffle(array) {
        const arr = [...array]; // copy to avoid mutating original
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return arr;
    }
    shuffleArray(array) {
        // Fisher-Yates shuffle algorithm
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    removeRandomElements(array, count) {
        const copy = [...array];
        for (let i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * copy.length);
            copy.splice(index, 1);
        }
        return copy;
    }
    calculate_expression(expr) {
        //console.log("calculate_expression with this exp: ", expr);
        let operator;
        let operands;
        // Remove all white spaces and handle simple arithmetic expressions
        expr = expr.replace(/\s+/g, '');
        // Replace any non-numeric characters with nothing (sanitize to avoid code injection)
        const sanitizedExpr = expr.replace(/[^0-9+\-*/().]/g, '');
        //console.log("this is the expression: ", sanitizedExpr);
        if (sanitizedExpr.includes('+')) {
            operator = '+';
            operands = sanitizedExpr.split('+');
        }
        else if (sanitizedExpr.includes('-')) {
            operator = '-';
            operands = sanitizedExpr.split('-');
        }
        else {
            //console.log("THIS IS HERE: ", sanitizedExpr);
            return Number(sanitizedExpr);
        }
        // Convert operands to numbers
        const num1 = Number(operands[0]);
        const num2 = Number(operands[1]);
        // Perform the operation based on the operator
        if (operator === '+') {
            return num1 + num2;
        }
        else {
            return num1 - num2;
        }
    }
    get_actions_from_types(actionNames, stateNames, actionTypes) {
        const actions = [];
        actionNames.forEach(actionName => {
            let action_type = actionTypes[this.getRandomInt(actionTypes.length)];
            const variableValue = "" + this.getRandomInt(10);
            const stateValue1 = stateNames[this.getRandomInt(stateNames.length)];
            const stateValue2 = stateNames[this.getRandomInt(stateNames.length)];
            const stateValue3 = stateNames[this.getRandomInt(stateNames.length)];
            const processedLines = action_type.map(line => {
                let newLine = line.replace(/\$variable/g, variableValue);
                newLine = newLine.replace(/\$action/g, actionName);
                const operator = Math.random() < 0.5 ? '+' : '-';
                newLine = newLine.replace(/\$\+\-/g, operator);
                // Replace first $state with stateValue1, second with stateValue2
                let stateCount = 0;
                newLine = newLine.replace(/\$state/g, () => {
                    stateCount++;
                    if (stateCount === 1)
                        return stateValue1;
                    if (stateCount === 2)
                        return stateValue2;
                    return stateValue3; // Return stateValue3 for the third $state
                });
                return newLine;
            });
            actions.push(processedLines);
        });
        return actions;
    }
    get_actions_from_types_with_difficulty(actionNames, stateNames, actionTypes, difficulty, targetState, smt) {
        // difficulty 1 easy, difficulty 2 hard
        const actions = [];
        // filtered Array of stateNames without targetState
        const filteredStateNames = stateNames.filter(state => state !== targetState);
        // ActionType that sets a state directly to value
        //let easyActionType = actionTypes[4];
        let targetStateAppears = false;
        if (targetState != undefined) {
            targetStateAppears = Math.random() < 0.5;
        }
        actionNames.forEach((actionName, index) => {
            const isLast = index === actionNames.length - 1;
            let action_type;
            // random boolean to determine if easy difficulty is actiontype4 or if targetstate is not in the actions
            console.log("targetStateAppears", targetStateAppears);
            if (isLast && difficulty == 1 && targetStateAppears) {
                //Easy Action Type / ActionType that sets a state directly to value
                action_type = actionTypes[4];
            }
            else {
                action_type = actionTypes[this.getRandomInt(actionTypes.length)];
            }
            const variableValue = "" + this.getRandomInt(10);
            let stateValue1;
            let stateValue2;
            let stateValue3;
            if (difficulty == 1) {
                stateValue1 = filteredStateNames[this.getRandomInt(filteredStateNames.length)];
                stateValue2 = filteredStateNames[this.getRandomInt(filteredStateNames.length)];
                stateValue3 = filteredStateNames[this.getRandomInt(filteredStateNames.length)];
            }
            else {
                stateValue1 = stateNames[this.getRandomInt(stateNames.length)];
                stateValue2 = stateNames[this.getRandomInt(stateNames.length)];
                stateValue3 = stateNames[this.getRandomInt(stateNames.length)];
            }
            const processedLines = action_type.map(line => {
                let newLine = line.replace(/\$variable/g, variableValue);
                newLine = newLine.replace(/\$action/g, actionName);
                const operator = Math.random() < 0.5 ? '+' : '-';
                newLine = newLine.replace(/\$\+\-/g, operator);
                // Replace first $state with stateValue1, second with stateValue2
                let stateCount = 0;
                if (smt == "Context") {
                    newLine = newLine.replace(/\$state/g, () => {
                        stateCount++;
                        console.log("stateValue1", stateValue1);
                        // the action_type on isLast is already the easy one (just one State)
                        if (stateCount === 1 && difficulty == 1 && isLast && targetStateAppears)
                            return targetState.toUpperCase();
                        if (stateCount === 1)
                            return stateValue1.toUpperCase();
                        if (stateCount === 2)
                            return stateValue2;
                        return stateValue3; // Return stateValue3 for the third $state
                    });
                }
                else {
                    newLine = newLine.replace(/\$state/g, () => {
                        stateCount++;
                        // the action_type on isLast is already the easy one (just one State)
                        if (stateCount === 1 && difficulty == 1 && isLast && targetStateAppears)
                            return targetState;
                        if (stateCount === 1)
                            return stateValue1;
                        if (stateCount === 2)
                            return stateValue2;
                        return stateValue3; // Return stateValue3 for the third $state
                    });
                }
                return newLine;
            });
            actions.push(processedLines);
        });
        return actions;
    }
    get_actions_from_types_with_error(actionNames, stateNames, actionTypes, hasError) {
        const actions = [];
        actionNames.forEach(actionName => {
            let action_type = actionTypes[this.getRandomInt(actionTypes.length)];
            // If hasError, remove one random "$state" occurrence before processing
            if (hasError) {
                const flatLines = action_type.flatMap((line, index) => {
                    const occurrences = [...line.matchAll(/\$state/g)].map(match => ({
                        lineIndex: index,
                        startIndex: match.index
                    }));
                    return occurrences;
                });
                if (flatLines.length > 0) {
                    const toRemove = flatLines[this.getRandomInt(flatLines.length)];
                    const { lineIndex, startIndex } = toRemove;
                    const targetLine = action_type[lineIndex];
                    action_type[lineIndex] =
                        targetLine.slice(0, startIndex) +
                            targetLine.slice(startIndex + 6); // "$state" is 6 characters
                }
            }
            const variableValue = "" + this.getRandomInt(10);
            const stateValue1 = stateNames[this.getRandomInt(stateNames.length)];
            const stateValue2 = stateNames[this.getRandomInt(stateNames.length)];
            const stateValue3 = stateNames[this.getRandomInt(stateNames.length)];
            const processedLines = action_type.map(line => {
                let newLine = line.replace(/\$variable/g, variableValue);
                newLine = newLine.replace(/\$action/g, actionName);
                const operator = Math.random() < 0.5 ? '+' : '-';
                newLine = newLine.replace(/\$\+\-/g, operator);
                let stateCount = 0;
                newLine = newLine.replace(/\$state/g, () => {
                    stateCount++;
                    if (stateCount === 1)
                        return stateValue1;
                    if (stateCount === 2)
                        return stateValue2;
                    return stateValue3;
                });
                return newLine;
            });
            actions.push(processedLines);
        });
        return actions;
    }
    // JOTAI PART
    get_jotai_action_types() {
        const action_one = [
            "const $action = atom(",
            "    null,",
            "    (get, set) => {",
            "        set($state, get($state) $+- $variable )",
            "    }",
            ");",
        ];
        const action_two = [
            "const $action = atom(",
            "    null,",
            "    (get, set) => {",
            "        set($state, $variable $+- get($state))",
            "    }",
            ");",
        ];
        const action_three = [
            "const $action = atom(",
            "    null,",
            "    (get, set) => {",
            "        set($state, get($state) $+- get($state) )",
            "    }",
            ");",
        ];
        const action_four = [
            "const $action = atom(",
            "    null,",
            "    (get, set) => {",
            "        set($state, get($state))",
            "    }",
            ");",
        ];
        const action_five = [
            "const $action = atom(",
            "    null,",
            "    (get, set) => {",
            "        set($state, $variable)",
            "    }",
            ");",
        ];
        return [action_one, action_two, action_three, action_four, action_five];
    }
    get_jotai_states(stateNames) {
        const states = [];
        const initialStateValues = {}; // We will store initial values here
        stateNames.forEach(stateName => {
            const initialValue = this.getRandomInt(10); // Generate the random initial value
            let state = "const $stateName = atom($value);";
            state = state.replace("$stateName", stateName).replace("$value", "" + initialValue);
            states.push(state);
            // Save the state name and its initial value in the map
            initialStateValues[stateName] = initialValue;
        });
        return { states, initialStateValues }; // Return both the raw state code and initial state values
    }
    write_jotai_code(hasError, difficulty, smt, errorType, correctStateGroup) {
        // Step 1: Determine number of correct states
        let amountStates = 0;
        if (correctStateGroup === 0) {
            amountStates = this.getRandomIntBetween(0, 2);
        }
        else if (correctStateGroup === 1) {
            amountStates = this.getRandomIntBetween(3, 5);
        }
        else {
            amountStates = this.getRandomIntBetween(6, 8);
        }
        //const amountStates = this.getRandomIntBetween(3,9);
        const amountActions = this.getRandomIntBetween(3, 6);
        const stateNames = this.getRandomStateName(amountStates);
        const actionNames = this.getRandomActionName(amountActions, stateNames);
        const { states, initialStateValues } = this.get_jotai_states(stateNames); // Get both the state code and initial values
        // Pick 1 random target state to observe
        const targetState = stateNames[this.getRandomInt(stateNames.length)];
        //const targetState = "NONE";
        // actionNames: string[], stateNames: string[], actionTypes: string[][], difficulty: number, targetState: string, smt: string
        const actions = this.get_actions_from_types_with_difficulty(actionNames, stateNames, this.get_jotai_action_types(), difficulty, targetState, smt); //Generate with Error
        // this is new for the test:
        // Prepare units: states are strings, actions are string[] (with empty line at start)
        const units = [
            ...states,
            ...actions.map(actionBlock => ["", ...actionBlock])
        ];
        // Shuffle the units
        for (let i = units.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [units[i], units[j]] = [units[j], units[i]];
        }
        // Flatten the result: if unit is string, just push; if unit is string[], push all
        const mixedLines = [];
        for (const unit of units) {
            if (typeof unit === "string") {
                mixedLines.push(unit);
            }
            else {
                mixedLines.push(...unit);
            }
        }
        // Final lines
        const lines = [
            //"import {atom} from 'jotai';",
            //"",
            ...mixedLines
        ];
        this.writeln("<div class='block'>");
        // Formatting and writing output
        lines.forEach(line => {
            line = line.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        this.writeln("</div>");
        return String(stateNames.length);
    }
    // REDUX PART
    get_redux_action_types() {
        const action_one = [
            "       $action: (state) => {",
            "           state.$state = state.$state $+- $variable;",
            "       },",
        ];
        const action_two = [
            "       $action: (state) => {",
            "           state.$state = $variable $+- state.$state;",
            "       },",
        ];
        const action_three = [
            "       $action: (state) => {",
            "           state.$state = state.$state $+- state.$state;",
            "       },",
        ];
        const action_four = [
            "       $action: (state) => {",
            "           state.$state = state.$state;",
            "       },",
        ];
        const action_five = [
            "       $action: (state) => {",
            "           state.$state = $variable;",
            "       },",
        ];
        return [action_one, action_two, action_three, action_four, action_five];
    }
    write_redux_code(hasError, difficulty, smt, errorType, correctStateGroup) {
        // Step 1: Determine number of correct states
        let amountCorrectStates = 0;
        if (correctStateGroup === 0) {
            amountCorrectStates = this.getRandomIntBetween(0, 2);
        }
        else if (correctStateGroup === 1) {
            amountCorrectStates = this.getRandomIntBetween(3, 5);
        }
        else {
            amountCorrectStates = this.getRandomIntBetween(6, 8);
        }
        // Generate a pool of unique state names
        const fullPool = this.getRandomStateName(amountCorrectStates + this.getRandomIntBetween(3, 5));
        const correctStateNames = this.shuffleArray([...fullPool]).slice(0, amountCorrectStates);
        const remainingStateNames = fullPool.filter(name => !correctStateNames.includes(name));
        // Assign initial values to correct states
        const initialStateMap = {};
        for (const name of correctStateNames) {
            initialStateMap[name] = this.getRandomInt(10);
        }
        // Generate actions based only on correct states
        const amountActions = this.getRandomIntBetween(3, 6);
        const actionNames = this.getRandomActionName(amountActions, correctStateNames);
        const targetState = correctStateNames[this.getRandomInt(correctStateNames.length)];
        const actions = this.get_actions_from_types_with_difficulty(actionNames, fullPool, this.get_redux_action_types(), difficulty, targetState, smt);
        const clonedActions = [...actions];
        // Shuffle cloned actions
        for (let i = clonedActions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clonedActions[i], clonedActions[j]] = [clonedActions[j], clonedActions[i]];
        }
        // Step 2: Inject errors by adding false states randomly
        let adjustedStateNames1 = [];
        let adjustedStateNames2 = [];
        if (!hasError) {
            adjustedStateNames1 = [...correctStateNames];
            adjustedStateNames2 = [...correctStateNames];
        }
        else {
            const falseStates1 = [];
            const falseStates2 = [];
            const shuffledRemaining = this.shuffleArray([...remainingStateNames]);
            for (const name of shuffledRemaining) {
                const target = this.getRandomIntBetween(1, 2); // Either list 1 or 2
                if (target === 1)
                    falseStates1.push(name);
                else
                    falseStates2.push(name);
            }
            adjustedStateNames1 = [...correctStateNames, ...falseStates1];
            adjustedStateNames2 = [...correctStateNames, ...falseStates2];
        }
        const shuffledBlock1 = this.shuffleArray([...adjustedStateNames1]);
        const shuffledInitial = this.shuffleArray([...adjustedStateNames2]);
        const lines = [
            //"import { createSlice } from '@reduxjs/toolkit'",
            //"import { useDispatch, useSelector } from 'react-redux'",
            //"",
            "interface testState {",
            ...shuffledBlock1.map(stateName => `   ${stateName}: number,`),
            "}",
            "",
            "const initialState: testState = {",
            ...shuffledInitial.map((stateName) => {
                var _a;
                const value = (_a = initialStateMap[stateName]) !== null && _a !== void 0 ? _a : this.getRandomInt(10);
                return `   ${stateName}: ${value},`;
            }),
            "}",
            "",
            "export const testSlice = createSlice({",
            "   name: 'testState',",
            "   initialState,",
            "   reducers: {",
            ...clonedActions.reduce((acc, action) => {
                acc.push("");
                return acc.concat(action);
            }, []),
            "   },",
            "});",
            "",
            `export const { ${actionNames.join(', ')} } = testSlice.actions;`,
            "export default testSlice.reducer",
            "",
            "export const store = configureStore({",
            "   reducer: {",
            "       testSlice: testSlice.reducer",
            "   },",
            "})",
            "",
            "export type RootState = ReturnType&lt;typeof store.getState&gt;",
            "export type AppDispatch = typeof store.dispatch;",
            "",
            "export const useAppDispatch = useDispatch.withTypes&lt;AppDispatch&gt();",
            "export const useAppSelector = useSelector.withTypes&lt;RootState&gt();"
        ];
        this.writeln("<div class='block'>");
        lines.forEach(line => {
            line = line.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        this.writeln("</div>");
        // Step 3: Return match count for testing
        const set1 = new Set(adjustedStateNames1);
        const set2 = new Set(adjustedStateNames2);
        let equalCount = 0;
        for (const name of correctStateNames) {
            if (set1.has(name) && set2.has(name)) {
                equalCount++;
            }
        }
        console.log("equalCount: ", equalCount);
        console.log("amountCorrectStates: ", amountCorrectStates);
        return String(equalCount);
    }
    write_redux_code_old(hasError, difficulty, smt, errorType) {
        const amountStates = this.getRandomIntBetween(3, 9);
        const amountActions = this.getRandomIntBetween(3, 6);
        const stateNames = this.getRandomStateName(amountStates);
        const actionNames = this.getRandomActionName(amountActions, stateNames);
        const initialStateValues = [];
        for (const stateName of stateNames) {
            let randomValue = this.getRandomInt(10);
            initialStateValues.push(randomValue);
        }
        // Pick 1 random target state to observe
        const targetState = stateNames[this.getRandomInt(stateNames.length)];
        // actionNames: string[], stateNames: string[], actionTypes: string[][], difficulty: number, targetState: string, smt: string
        const actions = this.get_actions_from_types_with_difficulty(actionNames, stateNames, this.get_redux_action_types(), difficulty, targetState, smt); //Generate with Error
        const clonedActions = [...actions]; // shallow copy
        // Shuffle in-place
        for (let i = clonedActions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clonedActions[i], clonedActions[j]] = [clonedActions[j], clonedActions[i]];
        }
        //Kann pro Feld max Hälfte löschen
        // Fehlerfall 1:
        const adjustedStateNames1 = hasError
            ? this.removeRandomElements(stateNames, Math.floor(Math.random() * stateNames.length / 2) + 1)
            : stateNames;
        // Fehlerfall 2:
        const adjustedStateNames2 = hasError
            ? this.removeRandomElements(stateNames, Math.floor(Math.random() * stateNames.length / 2) + 1)
            : stateNames;
        const shuffled2 = this.shuffleArray(adjustedStateNames2);
        const lines = [
            //"import { createSlice } from '@reduxjs/toolkit'",
            //"import { useDispatch, useSelector } from 'react-redux'",
            //"",
            "interface testState {",
            ...adjustedStateNames1.map(stateName => `   ${stateName}: number,`),
            "}",
            "",
            "const initialState: testState = {",
            ...shuffled2.map((stateName, index) => `   ${stateName}: ${initialStateValues[index]},`),
            "}",
            "",
            "export const testSlice = createSlice({",
            "   name: 'testState',",
            "   initialState,",
            "   reducers: {",
            ...clonedActions.reduce((acc, action) => {
                acc.push(""); // add empty line before each action
                return acc.concat(action);
            }, []),
            "   },",
            "});",
            "",
            `export const { ${actionNames.join(', ')} } = testSlice.actions;`,
            "export default testSlice.reducer",
            "",
            "export const store = configureStore({",
            "   reducer: {",
            "       testSlice.reducer",
            "   },",
            "})",
            "",
            "export type RootState = ReturnType&lt;typeof store.getState&gt;",
            "export type AppDispatch = typeof store.dispatch;",
            "",
            "export const useAppDispatch = useDispatch.withTypes&lt;AppDispatch&gt();",
            "export const useAppSelector = useSelector.withTypes&lt;RootState&gt();"
        ];
        this.writeln("<div class='block'>");
        // Formatting and writing output
        lines.forEach(line => {
            line = line.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        this.writeln("</div>");
        const set1 = new Set(adjustedStateNames1);
        const set2 = new Set(adjustedStateNames2);
        let equalCount = 0;
        for (const item of set1) {
            if (set2.has(item)) {
                equalCount++;
            }
        }
        return String(equalCount);
        //return String(stateNames.length);
    }
    // ZUSTAND PART
    get_zustand_action_types() {
        const action_one = [
            "   $action: () => {",
            "       set((state) => {$state: state.$state $+- $variable})",
            "   },"
        ];
        const action_two = [
            "   $action: () => {",
            "       set((state) => {$state: $variable $+- state.$state})",
            "   },"
        ];
        const action_three = [
            "   $action: () => {",
            "       set((state) => {$state: state.$state $+- state.$state})",
            "   },"
        ];
        const action_four = [
            "   $action: () => {",
            "       set((state) => {$state: state.$state})",
            "   },"
        ];
        const action_five = [
            "   $action: () => {",
            "       set((state) => {$state: $variable})",
            "   },"
        ];
        return [action_one, action_two, action_three, action_four, action_five];
    }
    write_zustand_code(hasError, difficulty, smt, errorType, correctStateGroup) {
        var _a;
        // Step 1: Determine number of correct states
        let amountCorrectStates = 0;
        if (correctStateGroup === 0) {
            amountCorrectStates = this.getRandomIntBetween(0, 2);
        }
        else if (correctStateGroup === 1) {
            amountCorrectStates = this.getRandomIntBetween(3, 5);
        }
        else {
            amountCorrectStates = this.getRandomIntBetween(6, 8);
        }
        // Generate a pool of unique state names
        const totalAvailableStateNames = this.getRandomStateName(amountCorrectStates + this.getRandomIntBetween(3, 5));
        const correctStateNames = this.shuffleArray([...totalAvailableStateNames]).slice(0, amountCorrectStates);
        const remainingStateNames = totalAvailableStateNames.filter(name => !correctStateNames.includes(name));
        console.log("correctStateNames: ", correctStateNames);
        console.log("remainingStateNames: ", remainingStateNames);
        // Assign initial values to correct states
        const initialStateMap = {};
        for (const name of correctStateNames) {
            initialStateMap[name] = this.getRandomInt(10);
        }
        // Generate actions based only on correct states
        const amountActions = this.getRandomIntBetween(3, 6);
        const actionNames = this.getRandomActionName(amountActions, totalAvailableStateNames);
        const targetState = correctStateNames[this.getRandomInt(correctStateNames.length)];
        const actions = this.get_actions_from_types_with_difficulty(actionNames, totalAvailableStateNames, this.get_zustand_action_types(), difficulty, targetState, smt);
        // Step 2: Adjust state usage in two separate parts of the code
        let adjustedStateNames1 = [];
        let adjustedStateNames2 = [];
        if (!hasError) {
            adjustedStateNames1 = [...correctStateNames];
            adjustedStateNames2 = [...correctStateNames];
        }
        else {
            // Distribute remaining states between 1 or both adjusted sets, avoiding complete overlap
            const shuffledRemaining = this.shuffleArray([...remainingStateNames]);
            const extra1 = [];
            const extra2 = [];
            for (const name of shuffledRemaining) {
                const target = this.getRandomIntBetween(1, 2); // Either 1 or 2
                if (target === 1) {
                    extra1.push(name);
                }
                else {
                    extra2.push(name);
                }
            }
            adjustedStateNames1 = [...correctStateNames, ...extra1];
            adjustedStateNames2 = [...correctStateNames, ...extra2];
            console.log("adjustedStateNames1: ", adjustedStateNames1);
            console.log("adjustedStateNames2: ", adjustedStateNames2);
        }
        // Step 3: Create type/interface part
        const statesAndActionsBeforeShuffle = [
            ...adjustedStateNames1.map(stateName => `   ${stateName}: number,`),
            ...actionNames.map(actionName => `   ${actionName}: () => void,`)
        ];
        const statesAndActions = this.shuffleArray(statesAndActionsBeforeShuffle); // in-place shuffle
        // Step 4: Create useTestState implementation part
        const entries = [];
        for (const name of adjustedStateNames2) {
            entries.push(`   ${name}: ${(_a = initialStateMap[name]) !== null && _a !== void 0 ? _a : this.getRandomInt(10)},`);
        }
        for (const action of actions) {
            entries.push(action); // action is a string[]
        }
        const combinedEntries = this.shuffleArray(entries).flat();
        // Step 5: Emit the code
        const lines = [
            //"import { create } from 'zustand'",
            //"",
            "type testState = {",
            ...statesAndActions,
            "}",
            "",
            "export const useTestState = create&lt;testState&gt;()((set) => ({",
            ...combinedEntries,
            "",
            "}))"
        ];
        this.writeln("<div class='block'>");
        lines.forEach(line => {
            line = line.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        this.writeln("</div>");
        // Step 6: Count overlapping correct state names
        const set1 = new Set(adjustedStateNames1);
        const set2 = new Set(adjustedStateNames2);
        let equalCount = 0;
        console.log("set1: ", adjustedStateNames1, "set2: ", adjustedStateNames2);
        for (const name of correctStateNames) {
            if (set1.has(name) && set2.has(name)) {
                equalCount++;
            }
        }
        console.log("equalCount: ", equalCount);
        console.log("amountCorrectStates: ", amountCorrectStates);
        return String(equalCount);
    }
    write_zustand_code_old(hasError, difficulty, smt, errorType) {
        const amountStates = this.getRandomIntBetween(3, 9);
        const amountActions = this.getRandomIntBetween(3, 6);
        const stateNames = this.getRandomStateName(amountStates);
        const actionNames = this.getRandomActionName(amountActions, stateNames);
        const initialStateValues = [];
        for (const stateName of stateNames) {
            let randomValue = this.getRandomInt(10);
            initialStateValues.push(randomValue);
        }
        // Pick 1 random target state to observe
        const targetState = stateNames[this.getRandomInt(stateNames.length)];
        //const targetState = "NONE";
        const actions = this.get_actions_from_types_with_difficulty(actionNames, stateNames, this.get_zustand_action_types(), difficulty, targetState, smt); //Generate with Error
        // Fehlerfall 1:
        const adjustedStateNames1 = hasError
            ? this.removeRandomElements(stateNames, Math.floor(Math.random() * ((stateNames.length / 2) + 1)) + 1)
            : stateNames;
        const statesAndActions = [
            ...adjustedStateNames1.map(stateName => `   ${stateName}: number,`),
            ...actionNames.map(actionName => `   ${actionName}: () => void,`)
        ];
        // Shuffle the units
        for (let i = statesAndActions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [statesAndActions[i], statesAndActions[j]] = [statesAndActions[j], statesAndActions[i]];
        }
        //useTestState actions and states:
        const entries = [];
        // Combine: each state line and each action (multi-line array)
        // Fehlerfall 2:
        const adjustedStateNames2 = hasError
            ? this.removeRandomElements(stateNames, Math.floor(Math.random() * ((stateNames.length / 2) + 1)) + 1)
            : stateNames;
        for (let i = 0; i < adjustedStateNames2.length; i++) {
            entries.push(`   ${adjustedStateNames2[i]}: ${initialStateValues[i]},`);
        }
        for (let i = 0; i < actions.length; i++) {
            entries.push(actions[i]); // actions[i] is an array of strings
        }
        // Now shuffle the entries
        const shuffledEntries = this.shuffleArray(entries);
        // Finally, flatten the result to a `string[]`
        const combinedEntries = shuffledEntries.flat();
        const lines = [
            //"import { create } from 'zustand'",
            //"",
            "type testState = {",
            ...statesAndActions,
            "}",
            "",
            "export const useTestState = create&lt;testState&gt;()((set) => ({",
            ...combinedEntries,
            "",
            "}))",
        ];
        this.writeln("<div class='block'>");
        // Formatting and writing output
        lines.forEach(line => {
            line = line.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        this.writeln("</div>");
        const set1 = new Set(adjustedStateNames1);
        const set2 = new Set(adjustedStateNames2);
        let equalCount = 0;
        for (const item of set1) {
            if (set2.has(item)) {
                equalCount++;
            }
        }
        return String(equalCount);
        //return String(stateNames.length);
    }
    // CONTEXT PART
    get_context_action_types() {
        const action_one = [
            "   const $action = () => {",
            "       set$state($state $+- $variable);",
            "   };",
        ];
        const action_two = [
            "   const $action = () => {",
            "       set$state($variable $+- $state);",
            "   };",
        ];
        const action_three = [
            "   const $action = () => {",
            "       set$state($state $+- $state);",
            "   };",
        ];
        const action_four = [
            "   const $action = () => {",
            "       set$state($state);",
            "   };",
        ];
        const action_five = [
            "   const $action = () => {",
            "       set$state($variable);",
            "   };",
        ];
        return [action_one, action_two, action_three, action_four, action_five];
    }
    write_context_code(hasError, difficulty, smt, errorType, correctStateGroup) {
        var _a;
        // Step 1: Determine number of correct states based on difficulty
        let amountCorrectStates = 0;
        if (correctStateGroup === 0) {
            amountCorrectStates = this.getRandomIntBetween(0, 2);
        }
        else if (correctStateGroup === 1) {
            amountCorrectStates = this.getRandomIntBetween(3, 5);
        }
        else {
            amountCorrectStates = this.getRandomIntBetween(6, 8);
        }
        // Step 2: Generate state and action names
        const totalAvailableStateNames = this.getRandomStateName(amountCorrectStates + this.getRandomIntBetween(3, 5));
        const correctStateNames = this.shuffleArray([...totalAvailableStateNames]).slice(0, amountCorrectStates);
        const remainingStateNames = totalAvailableStateNames.filter(name => !correctStateNames.includes(name));
        // Map state to initial values
        const initialStateMap = {};
        for (const name of correctStateNames) {
            initialStateMap[name] = this.getRandomInt(10);
        }
        // Step 3: Prepare actions
        const amountActions = this.getRandomIntBetween(3, 6);
        const actionNames = this.getRandomActionName(amountActions, totalAvailableStateNames);
        // Pick target state
        const targetState = correctStateNames[this.getRandomInt(correctStateNames.length)];
        console.log("targetState: ", targetState);
        console.log("totalAvailableStateNames: ", totalAvailableStateNames);
        const actions = this.get_actions_from_types_with_difficulty(actionNames, totalAvailableStateNames, this.get_context_action_types(), difficulty, targetState, smt);
        // Step 4: Create adjusted state name lists
        let adjustedStateNames1 = [];
        let adjustedStateNames2 = [];
        let adjustedStateNames3 = [];
        if (!hasError) {
            adjustedStateNames1 = [...correctStateNames];
            adjustedStateNames2 = [...correctStateNames];
            adjustedStateNames3 = [...correctStateNames];
        }
        else {
            // Distribute remaining (false) states into 1 or 2 of the 3 lists, avoiding full overlap
            const extra1 = [];
            const extra2 = [];
            const extra3 = [];
            const shuffledRemaining = this.shuffleArray([...remainingStateNames]);
            for (const name of shuffledRemaining) {
                const targetLists = this.shuffleArray([1, 2, 3]).slice(0, this.getRandomIntBetween(1, 2));
                if (targetLists.includes(1))
                    extra1.push(name);
                if (targetLists.includes(2))
                    extra2.push(name);
                if (targetLists.includes(3))
                    extra3.push(name);
            }
            adjustedStateNames1 = [...correctStateNames, ...extra1];
            adjustedStateNames2 = [...correctStateNames, ...extra2];
            adjustedStateNames3 = [...correctStateNames, ...extra3];
        }
        // Step 5: Build interface entries
        const statesAndActionsBeforeShuffle = [
            ...adjustedStateNames1.map(stateName => `   ${stateName}: number,`),
            ...actionNames.map(actionName => `   ${actionName}: () => void,`)
        ];
        const statesAndActions = this.shuffleArray(statesAndActionsBeforeShuffle); // in-place shuffle
        // Step 6: Build useState entries and actions
        const entries = [];
        for (const name of adjustedStateNames2) {
            entries.push(`   const [${name}, set${name.toUpperCase()}] = useState<number>(${(_a = initialStateMap[name]) !== null && _a !== void 0 ? _a : this.getRandomInt(10)});`);
        }
        for (const action of actions) {
            entries.push(action);
        }
        const mixedStateAndActions = this.shuffleArray(entries).flat();
        // Step 7: Final provider values
        const statesAndActionNames = this.shuffleArray([...adjustedStateNames3, ...actionNames]);
        const lines = [
            //"import { createContext, useState } from 'react';",
            //"",
            "interface testType {",
            ...statesAndActions,
            "}",
            "",
            "const TestContext = createContext(testType);",
            "",
            "export const TestProvider = ({children}) => {",
            ...mixedStateAndActions,
            "",
            "   return (",
            //`       &lt;TestContext.Provider value={{ ${stateNames.join(', ')}, ${actionNames.join(', ')} }}&gt;`,
            `       &lt;TestContext.Provider value={{ ${statesAndActionNames.join(', ')} }}&gt;`,
            "           {children}",
            "       &lt;/TestContext.Provider&gt;",
            "   )",
            "}",
            "",
            "export default TestContext;",
        ];
        this.writeln("<div class='block'>");
        // Formatting and writing output
        lines.forEach(line => {
            line = line.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        this.writeln("</div>");
        const set1 = new Set(adjustedStateNames1);
        const set2 = new Set(adjustedStateNames2);
        const set3 = new Set(adjustedStateNames3);
        let equalCount = 0;
        console.log("set1: ", adjustedStateNames1, "set2: ", adjustedStateNames2, "set3: ", adjustedStateNames3);
        for (const item of set1) {
            if (set2.has(item) && set3.has(item)) {
                equalCount++;
            }
        }
        console.log("equalCount: ", equalCount);
        console.log("amountCorrectStates: ", amountCorrectStates);
        return String(equalCount);
        //return String(stateNames.length);
    }
    write_context_code_old(hasError, difficulty, smt, errorType, correctStateAmount) {
        let amountCorrectStates = 0;
        if (correctStateAmount == 0) {
            amountCorrectStates = this.getRandomIntBetween(0, 2);
        }
        else if (correctStateAmount == 1) {
            amountCorrectStates = this.getRandomIntBetween(3, 5);
        }
        else {
            amountCorrectStates = this.getRandomIntBetween(6, 8);
        }
        //const amountStates = this.getRandomIntBetween(3,9);
        const amountActions = this.getRandomIntBetween(3, 6);
        //const stateNames = this.getRandomStateName(amountStates);
        const stateNames = this.getRandomStateName(amountCorrectStates);
        const actionNames = this.getRandomActionName(amountActions, stateNames);
        const initialStateValues = [];
        for (const stateName of stateNames) {
            let randomValue = this.getRandomInt(10);
            initialStateValues.push(randomValue);
        }
        // Pick 1 random target state to observe
        const targetState = stateNames[this.getRandomInt(stateNames.length)];
        // actionNames: string[], stateNames: string[], actionTypes: string[][], difficulty: number, targetState: string, smt: string
        const actions = this.get_actions_from_types_with_difficulty(actionNames, stateNames, this.get_context_action_types(), difficulty, targetState, smt); //Generate with Error
        // Fehlerfall 1:
        const adjustedStateNames1 = hasError
            ? this.removeRandomElements(stateNames, Math.floor(Math.random() * ((stateNames.length / 2) + 1)) + 1)
            : stateNames;
        const statesAndActions = [
            ...adjustedStateNames1.map(stateName => `   ${stateName}: number,`),
            ...actionNames.map(actionName => `   ${actionName}: () => void,`)
        ];
        // Shuffle the units
        for (let i = statesAndActions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [statesAndActions[i], statesAndActions[j]] = [statesAndActions[j], statesAndActions[i]];
        }
        //mix in TestProvider definition:
        // Step 1: Combine states and actions as separate blocks
        const entries = [];
        // Fehlerfall 2:
        const adjustedStateNames2 = hasError
            ? this.removeRandomElements(stateNames, Math.floor(Math.random() * ((stateNames.length / 2) + 1)) + 1)
            : stateNames;
        for (let i = 0; i < adjustedStateNames2.length; i++) {
            entries.push(`   const [${adjustedStateNames2[i]}, set${adjustedStateNames2[i].toUpperCase()}] = useState<number>(${initialStateValues[i]});`);
        }
        for (const action of actions) {
            entries.push(action); // `action` is a string[] (multi-line block)
        }
        // Step 2: Shuffle the combined entries
        const shuffledEntries = this.shuffleArray(entries);
        // Step 3: Flatten into a string[]
        const mixedStateAndActions = shuffledEntries.flat();
        //mix names:
        // Fehlerfall 3:
        const adjustedStateNames3 = hasError
            ? this.removeRandomElements(stateNames, Math.floor(Math.random() * ((stateNames.length / 2) + 1)) + 1)
            : stateNames;
        const statesAndActionNames = [
            ...adjustedStateNames3,
            ...actionNames
        ];
        for (let i = statesAndActionNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [statesAndActionNames[i], statesAndActionNames[j]] = [statesAndActionNames[j], statesAndActionNames[i]];
        }
        const lines = [
            //"import { createContext, useState } from 'react';",
            //"",
            "interface testType {",
            ...statesAndActions,
            "}",
            "",
            "const TestContext = createContext(testType);",
            "",
            "export const TestProvider = ({children}) => {",
            ...mixedStateAndActions,
            "",
            "   return (",
            //`       &lt;TestContext.Provider value={{ ${stateNames.join(', ')}, ${actionNames.join(', ')} }}&gt;`,
            `       &lt;TestContext.Provider value={{ ${statesAndActionNames.join(', ')} }}&gt;`,
            "           {children}",
            "       &lt;/TestContext.Provider&gt;",
            "   )",
            "}",
            "",
            "export default TestContext;",
        ];
        this.writeln("<div class='block'>");
        // Formatting and writing output
        lines.forEach(line => {
            line = line.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
            this.writeln(line);
        });
        this.writeln("</div>");
        const set1 = new Set(adjustedStateNames1);
        const set2 = new Set(adjustedStateNames2);
        const set3 = new Set(adjustedStateNames3);
        let equalCount = 0;
        console.log("set1: ", adjustedStateNames1, "set2: ", adjustedStateNames2, "set3: ", adjustedStateNames3);
        for (const item of set1) {
            if (set2.has(item) && set3.has(item)) {
                equalCount++;
            }
        }
        return String(equalCount);
        //return String(stateNames.length);
    }
}
export class Code_Generation_Task {
    constructor(hasError, stateManagementTool, correctStateGroup) {
        this.hasError = hasError;
        this.stateManagementTool = stateManagementTool;
        console.log(parseInt(correctStateGroup));
        this.correctStateGroup = parseInt(correctStateGroup);
    }
    error_position() {
        return this.hasError ? 3 : 0;
    }
    generate_code() {
        let writer = new Simple_Code_Writer([]);
        //console.log(this.stateManagementTool);
        //this.answer = writer.write_context_code();
        this.difficulty = 1;
        this.errorType = 1;
        console.log("HAS ERROR: ", this.hasError);
        //TEST
        /*
        this.correctStateGroup = 1;
        if (this.stateManagementTool.endsWith("_Error")) {
            this.stateManagementTool = "Redux_Error";
        } else {
            this.stateManagementTool = "Redux";
        }
        */
        console.log("this.stateManagementTool: ", this.stateManagementTool);
        //this.stateManagementTool = "Context";
        if (this.stateManagementTool == "Redux") {
            this.answer = writer.write_redux_code(false, this.difficulty, this.stateManagementTool, this.errorType, this.correctStateGroup);
        }
        else if (this.stateManagementTool == "Jotai") {
            this.answer = writer.write_jotai_code(false, this.difficulty, this.stateManagementTool, this.errorType, this.correctStateGroup);
        }
        else if (this.stateManagementTool == "Zustand") {
            this.answer = writer.write_zustand_code(false, this.difficulty, this.stateManagementTool, this.errorType, this.correctStateGroup);
        }
        else if (this.stateManagementTool == "Context") {
            this.answer = writer.write_context_code(false, this.difficulty, this.stateManagementTool, this.errorType, this.correctStateGroup);
        }
        else if (this.stateManagementTool == "Redux_Error") {
            this.answer = writer.write_redux_code(true, this.difficulty, this.stateManagementTool, this.errorType, this.correctStateGroup);
        }
        else if (this.stateManagementTool == "Zustand_Error") {
            this.answer = writer.write_zustand_code(true, this.difficulty, this.stateManagementTool, this.errorType, this.correctStateGroup);
        }
        else if (this.stateManagementTool == "Context_Error") {
            this.answer = writer.write_context_code(true, this.difficulty, this.stateManagementTool, this.errorType, this.correctStateGroup);
        }
        else {
            console.log("No this.stateManagementTool: ", this.stateManagementTool);
        }
        console.log("stateManagementTool is: ", this.stateManagementTool);
        console.log("answer is: ", this.answer);
        return writer.arr.join("");
    }
    response_text() {
        let ret = "";
        //ret = ret + "The correct response is: " + this.hasError + "\n\n";
        ret = ret + "The correct response is: " + this.answer + "\n\n";
        return ret;
    }
    debug_help(t) {
        if (t.task_number_in_execution == 5) {
            console.log("in here");
        }
        //console.log(this.error_position());
        console.log(this.hasError);
        //this.error_position();
    }
}
/*
export function create_tasks_grouped_by_error_position() {
    let state_management_tools = ["Redux", "Jotai", "Context", "Zustand", "Redux_Error", "Context_Error", "Zustand_Error"];
    let error_flags = [true, false];
    let all_smt_combinations: any[];

    all_smt_combinations = all_different_x_tupel(1, state_management_tools);
    //let ret = {1:[], 0:[]};
    let ret: Record<string, Code_Generation_Task[]> = {
        "true": [],
        "false": []
    };
    all_array_combinations([all_smt_combinations, error_flags],
        (combo) => {
            let task = new Code_Generation_Task(combo[1], combo[0]);
            ret["" + task.hasError].push(task);
    });
    console.log(ret);
    return ret;
}



export function create_tasks_grouped_by_tool() {
    let state_management_tools = ["Redux", "Jotai", "Context", "Zustand", "Redux_Error", "Context_Error", "Zustand_Error"];
    let amts = ["1", "2", "3"];

    let all_smt_combinations: any[] = all_different_x_tupel(1, state_management_tools);
    let all_amt_combinations: any[] = all_different_x_tupel(1, amts);
    let tasks: Code_Generation_Task[] = [];

    all_smt_combinations.forEach((combo) => {
        all_amt_combinations.forEach((amt) => {
            let task = new Code_Generation_Task(false , combo, amt); // Only pass the tool and hasError as false (to not touch the code)
            tasks.push(task);
        });
    });

    console.log(tasks);
    return tasks;
}
 */
//# sourceMappingURL=Feature_count_states.js.map