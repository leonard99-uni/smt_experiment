/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./2025_my_test/typescript/code/Feature_count_states_2.js":
/*!****************************************************************!*\
  !*** ./2025_my_test/typescript/code/Feature_count_states_2.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Code_Generation_Task: () => (/* binding */ Code_Generation_Task)
/* harmony export */ });
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
        const targetStateAppears = Math.random() < 0.5;
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
            amountStates = this.getRandomIntBetween(0, 3);
        }
        else {
            amountStates = this.getRandomIntBetween(5, 8);
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
            amountCorrectStates = this.getRandomIntBetween(0, 3);
        }
        else {
            amountCorrectStates = this.getRandomIntBetween(5, 8);
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
            amountCorrectStates = this.getRandomIntBetween(0, 3);
        }
        else {
            amountCorrectStates = this.getRandomIntBetween(5, 8);
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
            amountCorrectStates = this.getRandomIntBetween(0, 3);
        }
        else {
            amountCorrectStates = this.getRandomIntBetween(5, 8);
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
class Code_Generation_Task {
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
//# sourceMappingURL=Feature_count_states_2.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Automata.js":
/*!*************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Automata.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata: () => (/* binding */ Automata),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");

function init() { }
class Automata {
    constructor(config) {
        this.current_state = -1;
        this.transitions = [];
        this.states = [];
        this.start_state = config.start;
        this.states = config.states;
        for (let i = 0; i < this.states.length; i++) {
            this.transitions.push([]);
        }
        for (let t of config.transitions) {
            if (this.transitions == null) {
                console.log("Something is wrong here");
            }
            if (this.transitions == undefined || t.from == undefined) {
                console.log("Something is wrong here");
            }
            if (this.transitions[t.from] == undefined) {
                console.log("Something is wrong here");
            }
            try {
                this.transitions[t.from].push(t);
            }
            catch (e) {
                console.log("weird");
            }
        }
        this.init_function = config.init_function;
        this.end_states = config.end_states;
    }
    // on_finish_function: (number) => void;
    input(input) {
        let matching_transition = this.first_match(input);
        let state_before = this.current_state;
        if (matching_transition != null) {
            this.current_state = matching_transition.next_state; // go to next state
            matching_transition.action(state_before, input, this.current_state); // go to next state
        }
    }
    start() {
        this.current_state = this.start_state;
    }
    first_match(input) {
        for (let i = 0; i < this.transitions[this.current_state].length; i++) {
            if (this.transitions[this.current_state][i].accepts(input))
                return this.transitions[this.current_state][i];
        }
        return null;
    }
    initialize() {
        this.current_state = this.start_state;
        this.init_function();
    }
    add_finish_action(action) {
        for (let transitions of this.transitions) {
            for (let transition of transitions) {
                if (this.is_transition_to_end(transition)) {
                    let former_action = transition.action;
                    transition.action = (from, input, next) => {
                        former_action(from, input, next);
                        action();
                    };
                }
            }
        }
    }
    is_transition_to_end(transition) {
        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(this.end_states, transition.next_state);
    }
    add_action_to_transitions(is_target_transition, action) {
        for (let transitions of this.transitions) {
            for (let transition of transitions) {
                if (is_target_transition(transition)) {
                    let former_action = transition.action;
                    transition.action = (from, input, next) => {
                        former_action(from, input, next);
                        action();
                    };
                }
            }
        }
    }
}
//# sourceMappingURL=Automata.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js":
/*!**************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata_Configurator: () => (/* binding */ Automata_Configurator),
/* harmony export */   create_automata: () => (/* binding */ create_automata),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Automata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Automata.js */ "./N-of-1-Experimentation/modules/Automata/Automata.js");

function init() { }
class Automata_Configurator {
    constructor(states, start, init_function, transitions, end_states) {
        this.states = states;
        this.start = start;
        this.init_function = init_function;
        this.transitions = transitions;
        this.end_states = end_states;
    }
}
function create_automata(states, start, init_function, transitions, end_states) {
    return new _Automata_js__WEBPACK_IMPORTED_MODULE_0__.Automata(new Automata_Configurator(states, start, init_function, transitions, end_states));
}
//# sourceMappingURL=Automata_Configurator.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js":
/*!***********************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata_Forwarder: () => (/* binding */ Automata_Forwarder)
/* harmony export */ });
class Automata_Forwarder {
    constructor(forwarder_name) {
        this.set_active_function = () => { };
        this.forwarder_name = forwarder_name;
    }
    input(s) {
        this.automata.input(s);
    }
    add_activation_function(to_add) {
        // let old_activation_function = this.set_active_function;
        // this.set_active_function = () => {
        //     old_activation_function();
        //     to_add();
        // }
    }
    set_active() { }
}
//# sourceMappingURL=Automata_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Transitions.js":
/*!****************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Transitions.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Simple_Transition: () => (/* binding */ Simple_Transition),
/* harmony export */   Transition: () => (/* binding */ Transition),
/* harmony export */   Transition_Acceptor_Function: () => (/* binding */ Transition_Acceptor_Function),
/* harmony export */   accept_all: () => (/* binding */ accept_all),
/* harmony export */   do_nothing: () => (/* binding */ do_nothing),
/* harmony export */   each_char: () => (/* binding */ each_char),
/* harmony export */   from: () => (/* binding */ from),
/* harmony export */   if_func: () => (/* binding */ if_func),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   pass: () => (/* binding */ pass)
/* harmony export */ });
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");

function init() { }
class Transition_Acceptor {
}
class Transition_Strings_Acceptor extends Transition_Acceptor {
    constructor(strings) {
        super();
        this.accepted_strings = strings;
    }
    accepts(input) {
        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(this.accepted_strings, input);
    }
}
class Transition_Acceptor_Function extends Transition_Acceptor {
    constructor(acceptor_function) {
        super();
        this.acceptor_function = acceptor_function;
    }
    accepts(input) {
        return this.acceptor_function(input);
    }
}
class Transition_Strings_Accepts_ALL extends Transition_Acceptor {
    accepts(input) {
        return true;
    }
}
function keys(strings) {
    return new Transition_Strings_Acceptor(strings);
}
function if_func(f) {
    return new Transition_Acceptor_Function(f);
}
function each_char(charlist) {
    var chars = [];
    for (let a of charlist) {
        chars.push(a);
    }
    return new Transition_Strings_Acceptor(chars);
}
class Transition {
    constructor(from, acceptor, next_state, action) {
        this.from = from;
        this.acceptor = acceptor;
        this.next_state = next_state;
        this.action = action;
    }
    ;
    is_valid_input(input) {
        return this.acceptor.accepts(input);
    }
    accepts(input) {
        return this.acceptor.accepts(input);
    }
}
function Simple_Transition(from, accept_input_function, next_state, action) {
    return new Transition(from, new Transition_Acceptor_Function(accept_input_function), next_state, (s, i, n) => action(i));
}
function accept_all() {
    return new Transition_Strings_Accepts_ALL();
}
function do_nothing(at, input, next) { }
function pass(f) {
    return (at, input, next) => f();
}
function from(from) {
    return {
        to: (to) => {
            return {
                on: (key) => {
                    return {
                        if: (check) => {
                            return {
                                do: (action) => {
                                    return Simple_Transition(from, (input) => { return input == key && check(input); }, to, action);
                                }
                            };
                        },
                        do: (action) => {
                            return Simple_Transition(from, (input) => { return input == key; }, to, action);
                        }
                    };
                },
                on_any: (keys) => {
                    return {
                        if: (check) => {
                            return {
                                do: (action) => {
                                    return Simple_Transition(from, (input) => {
                                        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(keys, input) && check(input);
                                    }, to, action);
                                }
                            };
                        },
                        do: (action) => {
                            return Simple_Transition(from, (input) => { return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(keys, input); }, to, action);
                        }
                    };
                }
            };
        },
    };
}
//# sourceMappingURL=Transitions.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js":
/*!**********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata_With_Output_Forwarder: () => (/* binding */ Automata_With_Output_Forwarder),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js");
/* harmony import */ var _Automata_Automata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata.js */ "./N-of-1-Experimentation/modules/Automata/Automata.js");


function init() { }
/*
    I don't do anything - I am just a superclass
 */
class Automata_With_Output_Forwarder extends _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Forwarder {
    constructor(forwarder_name, measurement, pre_run_instructions, post_run_instructions) {
        super(forwarder_name);
        this.pre_run_instructions = pre_run_instructions;
        this.post_run_instructions = post_run_instructions;
        this.measurement = measurement;
        this.automata = this.create_automata(); //new Automata(this.automata_configurator());
        this.automata.initialize();
    }
    set_active() {
        this.show_intro();
    }
    create_automata() {
        return new _Automata_Automata_js__WEBPACK_IMPORTED_MODULE_1__.Automata(this.automata_configurator());
    }
    output_writer() {
        return this.measurement.output_writer();
    }
    show_intro() {
        this.output_writer().clear_all();
        this.output_writer().print_string_to_state(this.forwarder_name);
        this.pre_run_instructions();
    }
    empty_screen_and_show_instructions(command) {
        this.output_writer().clear_state();
        this.output_writer().clear_stage();
        if (command == null || command == undefined)
            console.log("something is strange");
        else
            command();
    }
}
//# sourceMappingURL=Automata_With_Output_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Book_Forwarder.js":
/*!******************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Book_Forwarder.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Book_Forwarder: () => (/* binding */ Book_Forwarder),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Automata_With_Output_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js");



function init() { }
let SHOW_PAGE = 0;
let FINISHED_BOOK = 1;
let EVERYTHING_DONE = 1;
class Book_Forwarder extends _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Automata_With_Output_Forwarder {
    constructor(book_name, text, measurement) {
        super(book_name, measurement, text[0], text[text.length - 1]);
        this.current_page_number = -1;
        this.pages = text;
        this.create_automata();
    }
    set_page_index(index) {
        this.current_page_number = index;
        this.empty_screen_and_show_instructions(this.pages[this.current_page_number]);
        this.output_writer().print_string_to_state(this.forwarder_name);
        this.output_writer().print_string_to_page_number("Page " + (this.current_page_number + 1) + " / " + this.pages.length);
        let navigation_string = "<hr>";
        if (index > 0)
            navigation_string += "[&#8592] = previous page";
        if (index < this.pages.length - 1)
            navigation_string += (navigation_string != "<hr>" ? "<br>" : "") + "[&#8594] = next page";
        if (index == this.pages.length - 1)
            navigation_string += (navigation_string != "<hr>" ? "<br>" : "") + "[Enter] = Finish";
        this.output_writer().print_html_on_stage(navigation_string);
    }
    set_active() {
        super.set_active();
    }
    show_intro() {
        this.set_page_index(0);
    }
    show_outro() { }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__.Automata_Configurator([SHOW_PAGE, EVERYTHING_DONE], SHOW_PAGE, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        return [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__.from)(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowRight")
                .if((i) => this.current_page_number < this.pages.length - 1)
                .do((i) => {
                this.set_page_index(++this.current_page_number);
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__.from)(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowLeft")
                .if((i) => this.current_page_number > 0)
                .do((i) => {
                this.set_page_index(--this.current_page_number);
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__.from)(SHOW_PAGE).to(EVERYTHING_DONE)
                .on("Enter")
                .if((i) => this.current_page_number >= this.pages.length - 1)
                .do((i) => { })
        ];
    }
}
//# sourceMappingURL=Book_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experiment_Forwarder.js":
/*!************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Experiment_Forwarder.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experiment_Forwarder: () => (/* binding */ Experiment_Forwarder)
/* harmony export */ });
/* harmony import */ var _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Experimentation_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js");

class Experiment_Forwarder extends _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Experimentation_Forwarder {
    constructor(pre_run_instructions, experiment_definition, measurement) {
        super("Main Experiment", () => {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "Press [Enter] to start the experiment.");
        }, () => {
            measurement.output_writer().print_html_on_stage("You finished the experiment phase.<hr>" +
                "Please, press [Enter] to go to the next phase.<br>");
        }, experiment_definition, measurement);
    }
}
//# sourceMappingURL=Experiment_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js":
/*!*****************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experimentation_Forwarder: () => (/* binding */ Experimentation_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");
/* harmony import */ var _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Automata_With_Output_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js");



let SHOW_INTRO = 0;
let SHOW_PRE_TASK_INFO = 1;
let SHOW_TASK = 2;
let SHOW_PENALTY = 3;
let TASK_FINISHED = 4;
let SHOW_OUTRO = 5;
let EVERYTHING_DONE = 6;
class Experimentation_Forwarder extends _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Automata_With_Output_Forwarder {
    show_intro() {
        this.empty_screen_and_show_instructions(this.pre_run_instructions);
        this.output_writer().print_experiment_name(this.forwarder_name);
    }
    show_outro() {
        this.empty_screen_and_show_instructions(this.post_run_instructions);
    }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Configurator([SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    current_task() {
        return this.experiment_definition.tasks[this.current_page_index];
    }
    ;
    constructor(experiment_automata_name, pre_run_instructions, post_run_instructions, experiment_definition, measurement) {
        super(experiment_automata_name, measurement, pre_run_instructions, post_run_instructions);
        this.current_page_index = -1;
        this.experiment_definition = experiment_definition;
    }
    automata_configuration() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Configurator([SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        return [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_INTRO).to(SHOW_TASK)
                .on("Enter")
                .if((i) => !this.first_task().has_pre_task_description)
                .do((i) => {
                this.set_experiment_index(0);
                this.measurement.start_measurement(this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_INTRO).to(SHOW_PRE_TASK_INFO)
                .on("Enter")
                .if((i) => this.first_task().has_pre_task_description)
                .do((i) => {
                this.set_experiment_index(0);
                this.show_pre_task_info();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_INTRO).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on("Delete")
                .do((i) => {
                this.show_outro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_PRE_TASK_INFO).to(SHOW_TASK)
                .on("Enter")
                .do((i) => {
                this.measurement.start_measurement(this.current_task());
            }),
            // Task Shown - Incorrect input => Remain in Task
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_TASK)
                .on_any(this.measurement.accepted_responses())
                .if((i) => !this.current_task().accepts_answer(i) && !this.measurement.demands_penalty())
                .do((i) => {
                this.measurement.incorrect_response(i, this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_OUTRO)
                .on("?+Control")
                .if((i) => true)
                .do((i) => {
                this.measurement.stop_measurement(i, this.current_task());
                this.show_outro();
            }),
            // STATE 1=Task is shown, 2=Input correct
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(TASK_FINISHED)
                .on_any(this.measurement.accepted_responses())
                .if((i) => this.current_task().accepts_answer(i) &&
                this.current_page_index < this.experiment_definition.tasks.length - 1)
                .do((i) => {
                this.measurement.stop_measurement(i, this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_PENALTY)
                .on_any(this.measurement.accepted_responses())
                .if((i) => !this.current_task().accepts_answer(i) && this.measurement.demands_penalty())
                .do((i) => {
                this.measurement.incorrect_response(i, this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_PENALTY).to(SHOW_TASK)
                .on("Enter")
                .if((i) => this.measurement.penalty_is_over())
                .do((i) => {
                this.measurement.start_measurement(this.current_task());
            }),
            // Between Tasks to next task
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(TASK_FINISHED).to(SHOW_PRE_TASK_INFO)
                .on("Enter")
                .if((i) => this.current_page_index < this.experiment_definition.tasks.length - 1 && this.next_task().has_pre_task_description)
                .do((i) => {
                this.inc_current_experiment();
                this.show_pre_task_info();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(TASK_FINISHED).to(SHOW_TASK)
                .on("Enter")
                .if((i) => this.current_page_index < this.experiment_definition.tasks.length - 1 && !this.next_task().has_pre_task_description)
                .do((i) => {
                this.inc_current_experiment();
                this.measurement.start_measurement(this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on_any(this.measurement.accepted_responses())
                .if((i) => this.current_task().accepts_answer(i) &&
                this.current_page_index == this.experiment_definition.tasks.length - 1)
                .do((i) => {
                this.measurement.stop_measurement(i, this.current_task());
                this.show_outro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("Enter")
                .do((i) => {
                let a = 1;
            })
        ];
    }
    set_experiment_index(index) {
        this.current_page_index = index;
        this.output_writer().print_string_to_page_number("Task " + (this.current_page_index + 1) + " / " + this.experiment_definition.tasks.length);
    }
    inc_current_experiment() {
        this.set_experiment_index(++this.current_page_index);
    }
    init_experiment() {
        this.experiment_definition.init_experiment(false);
    }
    show_pre_task_info() {
        this.output_writer().clear_stage();
        this.output_writer().clear_error();
        this.current_task().print_pre_task_info();
    }
    next_task() {
        return this.experiment_definition.tasks[this.current_page_index + 1];
    }
    first_task() {
        return this.experiment_definition.tasks[0];
    }
}
//# sourceMappingURL=Experimentation_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js":
/*!***************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alternatives: () => (/* binding */ Alternatives),
/* harmony export */   Freetext: () => (/* binding */ Freetext),
/* harmony export */   Information: () => (/* binding */ Information),
/* harmony export */   Question: () => (/* binding */ Question),
/* harmony export */   Questionnaire_Forwarder: () => (/* binding */ Questionnaire_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Automata_With_Output_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js");
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");



let SHOW_INTRO = 0;
let SHOW_QUESTION = 1;
let ANSWERED_INCOMPLETE = 2;
let ANSWERES_COMPLETE = 3;
let EVERYTHING_DONE = 4;
class Question {
    constructor(variable_name, question_text) {
        this.answer = null;
        this.variable_name = variable_name;
        this.question_text = question_text;
    }
    store_answer() {
        let element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = element.value;
    }
}
class Alternatives extends Question {
    constructor(variable_name, question_text, alternatives) {
        super(variable_name, question_text);
        this.alternatives = alternatives;
    }
    input_html() {
        let html_string = "<select id=\"" + this.variable_name + "\">";
        html_string += "<option disabled selected value> -- select an option -- </option>";
        let index = 0;
        this.alternatives.forEach((a) => html_string += "<option value=" + index++ + ">" + a + "</option>");
        html_string += ("</select>");
        return html_string;
    }
    store_answer() {
        let element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = this.alternatives[element.value];
    }
}
class Information extends Question {
    html_string() {
        let html_string = "<p>We have one question to you.</p>";
        return html_string;
    }
    input_html() {
        let html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    }
    constructor(question_text) {
        super(null, question_text);
    }
}
class Freetext extends Question {
    html_string() {
    }
    input_html() {
        let html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    }
}
class Questionnaire_Forwarder extends _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Automata_With_Output_Forwarder {
    constructor(questions, measurement) {
        super("Questionnaire", measurement, () => measurement.output_writer().print_html_on_stage("Please, answer the following questions.<br>"), () => measurement.output_writer().print_html_on_stage("Thank you for answering the questions."));
        this.current_question_number = -1;
        this.questions = questions;
    }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__.Automata_Configurator([SHOW_INTRO, SHOW_QUESTION, ANSWERED_INCOMPLETE, ANSWERES_COMPLETE, EVERYTHING_DONE], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        return [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__.from)(SHOW_INTRO).to(EVERYTHING_DONE)
                .on("DONE")
                .if((i) => true)
                .do((i) => {
                this.add_result_to_question();
                console.log("dummy");
            }),
        ];
    }
    show_intro() {
        super.show_intro();
        let html_string = this.create_questionnaire_html_string();
        this.output_writer().print_html_on_stage(html_string);
        document.getElementById("DONE").onclick = () => this.input("DONE");
        ;
    }
    show_outro() {
    }
    create_questionnaire_html_string() {
        let html_string = "<fieldset><legend>Questionnaire</legend><div display: inline-block;><table>";
        this.questions.forEach((q) => html_string += "<tr><td>" + q.question_text + "</td>" +
            "<td>" + q.input_html() + "</td></tr>");
        html_string += "</table></div></fieldset><br><button id='DONE'>Ok - all questions answered</button>";
        return html_string;
    }
    add_result_to_question() {
        for (let question of this.questions) {
            question.store_answer();
        }
    }
}
//# sourceMappingURL=Questionnaire_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Training_Execution_Forwarder.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Training_Execution_Forwarder.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Training_Execution_Forwarder: () => (/* binding */ Training_Execution_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");
/* harmony import */ var _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Experimentation_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js");



let SHOW_INTRO = 0;
let SHOW_PRE_TASK_INFO = 1;
let SHOW_TASK = 2;
let SHOW_PENALTY = 3;
let TASK_FINISHED = 4;
let SHOW_OUTRO = 5;
let EVERYTHING_DONE = 6;
let ESCAPED = 7;
class Training_Execution_Forwarder extends _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Experimentation_Forwarder {
    constructor(pre_run_instructions, training_configuration, experiment_definition, measurement) {
        super("Training", () => {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "Press [Enter] to start training.");
        }, () => {
            measurement.output_writer().print_html_on_stage("You finished the training phase.<hr>" +
                (training_configuration.can_be_repeated ? "Please, press [Enter] to run again a training session.<br>" : "") +
                "Please, press [E] (capital E, i.e., [shift] + [e]) to enter the experiment phase.");
        }, experiment_definition, measurement);
        this.training_configuration = training_configuration;
    }
    print_cancel_text() {
        this.output_writer().clear_stage();
        this.output_writer().print_string_to_page_number("Cancelled");
        let navigation_string = "You cancelled this training session.<hr>" +
            "Press [Enter] if you want to start another training session.<br>" +
            "Press [E] (capital E!) if you want to start with the experiment.";
        this.output_writer().print_html_on_stage(navigation_string);
    }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Configurator([SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, SHOW_PENALTY, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE, ESCAPED], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        let experiment_transitions = super.transitions();
        let this_transitions = [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_INTRO).to(ESCAPED)
                .on("Escape")
                .if(() => this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(ESCAPED)
                .on("Escape")
                .if(() => this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(TASK_FINISHED).to(ESCAPED)
                .on("Escape")
                .if(() => this.current_page_index < this.experiment_definition.tasks.length - 1 && this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(ESCAPED).to(EVERYTHING_DONE)
                .on("E").do(() => {
                let dummy = 1;
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(ESCAPED).to(SHOW_INTRO)
                .on("Enter").do(() => {
                this.experiment_definition.init_experiment(true);
                this.show_intro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_OUTRO).to(SHOW_INTRO)
                .on("Enter")
                .if(() => this.training_configuration.can_be_repeated)
                .do(() => {
                this.experiment_definition.init_experiment(true);
                this.show_intro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("E")
                .do((i) => {
                let dummy = 1;
            })
        ];
        experiment_transitions.splice(experiment_transitions.length - 1);
        this_transitions.forEach((e) => experiment_transitions.push(e));
        return experiment_transitions;
    }
    input(s) {
        if (!["a", "b", "c"].includes(s) && this.automata.current_state != 0)
            return super.input(s);
        super.input(s);
    }
    init_experiment() {
        this.training_configuration.init_experiment(this.experiment_definition);
    }
}
//# sourceMappingURL=Training_Execution_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Books/Sequential_Forwarder_Forwarder.js":
/*!********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Books/Sequential_Forwarder_Forwarder.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sequential_Forwarder_Forwarder: () => (/* binding */ Sequential_Forwarder_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js");
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");



class Sequential_Forwarder_Forwarder extends _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Forwarder {
    constructor(forwarders) {
        super("Default Sequential Forwarder Forwader");
        this.current_forwarder_index = 0;
        this.forwarders = forwarders;
        for (let forwarder of forwarders) {
            forwarder.automata.add_finish_action(() => this.automata.input("switch to next state"));
        }
        this.automata = (0,_Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__.create_automata)([0, 1], 0, () => { }, [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__.from)(0).to(0)
                .on("switch to next state")
                .if(() => this.current_forwarder_index < this.forwarders.length - 1)
                .do(() => { this.current_forwarder_index++; this.current_forwarder().set_active(); }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__.from)(0).to(1)
                .on("switch to next state")
                .if(() => this.current_forwarder_index == this.forwarders.length - 1)
                .do(() => { })
        ], [1]);
        this.automata.initialize();
        // this.set_active();
        // console.log("active forward: " + this.current_forwarder().forwarder_name);
    }
    input(input) {
        this.forwarders[this.current_forwarder_index].input(input);
    }
    input_sequence(input_sequence) {
        for (let s of input_sequence)
            this.input(s);
    }
    current_forwarder() {
        return this.forwarders[this.current_forwarder_index];
    }
    set_active() {
        super.set_active();
        this.current_forwarder().set_active();
    }
}
//# sourceMappingURL=Sequential_Forwarder_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js":
/*!*********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BROWSER_EXPERIMENT: () => (/* binding */ BROWSER_EXPERIMENT),
/* harmony export */   Browser_Output_Writer: () => (/* binding */ Browser_Output_Writer)
/* harmony export */ });
/* harmony import */ var _Experimentation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Experimentation.js */ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");
/* harmony import */ var _functions_create_code_experiment_execution_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/create_code_experiment_execution.js */ "./N-of-1-Experimentation/modules/Experimentation/functions/create_code_experiment_execution.js");



class Browser_Output_Writer extends _Experimentation_js__WEBPACK_IMPORTED_MODULE_0__.Experiment_Output_Writer {
    print_experiment_name(s) {
        this.get_html_element_by_id("STATE").innerHTML = s;
    }
    clear_error() {
        let element_id = [
            "STAGE_ERROR"
        ];
        for (let e of element_id) {
            let parent = document.getElementById(e);
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    clear_stage() {
        let element_id = [
            "STAGE",
            "STAGE_MSG",
            "STAGE_ERROR"
        ];
        for (let e of element_id) {
            let parent = document.getElementById(e);
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    clear_state() {
        let element_id = [
            "STATE",
            "TASK"
        ];
        for (let e of element_id) {
            let parent = document.getElementById(e);
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    print_error_string_on_stage(s) {
        let e = this.get_html_element_by_id("STAGE_ERROR");
        e.innerHTML = s;
    }
    get_html_element_by_id(s) {
        // @ts-ignore
        return document.getElementById(s);
    }
    print_string_to_state(s) {
        this.get_html_element_by_id("STATE").innerHTML = s;
    }
    print_string_on_stage(s) {
        this.print_html_on_stage("<p>" + s + "</p>");
    }
    ask_for_input() {
        // @ts-ignore
        let p = document.createElement("p");
        let l = document.createElement("label");
        l.setAttribute('type', 'text');
        p.textContent = "Answer: ";
        p.appendChild(l);
        // @ts-ignore
        let i = document.createElement("input");
        i.setAttribute('type', 'text');
        i.setAttribute('class', 'input');
        p.appendChild(i);
        i.id = "INPUT";
        this.get_html_element_by_id("STAGE").appendChild(p);
        i.focus();
    }
    set_focus_on_input() {
        let i = this.get_html_element_by_id("INPUT");
        i.focus();
    }
    print_string_to_page_number(s) {
        this.get_html_element_by_id("TASK").innerHTML = s;
    }
    get_given_answer() {
        return this.get_html_element_by_id("INPUT").value;
    }
    print_on_input_response(given_answer) {
        this.get_html_element_by_id("INPUT").value = given_answer;
    }
    create_html_element_from_string(s) {
        let parser = new DOMParser();
        let elements = parser.parseFromString(s, "text/html").body;
        return elements;
    }
    print_html_on_stage(s) {
        // for(let e of this.create_html_element_from_string(s)) {
        this.get_html_element_by_id("STAGE")
            .appendChild(this.create_html_element_from_string(s));
        // }
    }
    print_html_on_error(s) {
        // for(let e of this.create_html_element_from_string(s)) {
        //     this.get_html_element_by_id("STAGE_ERROR")
        //         .appendChild(e);
        // }
        this.get_html_element_by_id("STAGE_ERROR")
            .appendChild(this.create_html_element_from_string(s));
    }
}
function BROWSER_EXPERIMENT(creator) {
    let browser_output = new Browser_Output_Writer();
    let cfg = creator(browser_output);
    (0,_Experimentation_js__WEBPACK_IMPORTED_MODULE_0__.SET_SEED)(cfg.seed);
    let this_measurement = cfg.measurement(browser_output);
    let experiment_automata = (0,_functions_create_code_experiment_execution_js__WEBPACK_IMPORTED_MODULE_2__.create_code_experiment_execution)({
        experiment_name: cfg.experiment_name,
        seed: cfg.seed,
        introduction_pages: cfg.introduction_pages,
        post_questionnaire: cfg.post_questionnaire,
        pre_run_training_output: cfg.pre_run_training_instructions,
        training_configuration: cfg.training_configuration,
        pre_run_experiment_output: cfg.pre_run_experiment_instructions,
        finish_pages: cfg.finish_pages,
        layout: cfg.layout,
        repetitions: cfg.repetitions,
        task_configuration: cfg.task_configuration,
        measurement: this_measurement,
        finish_function: (exp) => {
            // @ts-ignore
            document.removeEventListener("keydown", key_forwarder);
            (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.save_file_in_html)("experimentdata.csv", exp.generate_csv_data());
        }
    });
    let key_forwarder = (e) => {
        let key_string = (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.key_event_string)(e);
        experiment_automata.input(key_string);
    };
    // @ts-ignore
    document.addEventListener("keydown", key_forwarder, false);
    experiment_automata.set_active();
}
//# sourceMappingURL=Browser_Output_Writer.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Code_Experiment_Definition.js":
/*!**************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Code_Experiment_Definition.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Code_Experiment_Definition: () => (/* binding */ Code_Experiment_Definition),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Experiment_Definition.js */ "./N-of-1-Experimentation/modules/Experimentation/Experiment_Definition.js");
/* harmony import */ var _Automata_Forwarders_Book_Forwarder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata_Forwarders/Book_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Book_Forwarder.js");
/* harmony import */ var _Books_Sequential_Forwarder_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Books/Sequential_Forwarder_Forwarder.js */ "./N-of-1-Experimentation/modules/Books/Sequential_Forwarder_Forwarder.js");
/* harmony import */ var _Automata_Forwarders_Training_Execution_Forwarder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Automata_Forwarders/Training_Execution_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Training_Execution_Forwarder.js");
/* harmony import */ var _Automata_Forwarders_Experiment_Forwarder_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Automata_Forwarders/Experiment_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experiment_Forwarder.js");
/* harmony import */ var _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Automata_Forwarders/Questionnaire_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js");






function init() { }
// TODO: Both classes should be one!!!
// ASAP!!!!
class Code_Experiment_Definition extends _Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_0__.Experiment_Definition {
    create_code_all_experiment_automatas(cfg) {
        let output_writer = cfg.measurement.output_writer();
        let introduction_book = new _Automata_Forwarders_Book_Forwarder_js__WEBPACK_IMPORTED_MODULE_1__.Book_Forwarder("Introduction", cfg.introduction_texts, cfg.measurement);
        let ending_book = new _Automata_Forwarders_Book_Forwarder_js__WEBPACK_IMPORTED_MODULE_1__.Book_Forwarder("Finish", cfg.finish_texts, cfg.measurement);
        ending_book.automata.add_finish_action(() => cfg.finish_function(experiment_execution_forwarder.experiment_definition));
        let experiment_execution_forwarder = new _Automata_Forwarders_Experiment_Forwarder_js__WEBPACK_IMPORTED_MODULE_4__.Experiment_Forwarder(cfg.pre_run_experiment_output, this, cfg.measurement);
        experiment_execution_forwarder.init_experiment();
        let cloned_experiment_definition = this.clone();
        let training_forwarder = new _Automata_Forwarders_Training_Execution_Forwarder_js__WEBPACK_IMPORTED_MODULE_3__.Training_Execution_Forwarder(cfg.pre_run_training_output, cfg.training_configuration, cloned_experiment_definition, cfg.measurement);
        training_forwarder.init_experiment();
        let post_questionnaire = null;
        if (cfg.post_questionnaire != undefined) {
            post_questionnaire = new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_5__.Questionnaire_Forwarder(cfg.post_questionnaire, cfg.measurement);
        }
        let forwarders = [];
        if (introduction_book != null) {
            forwarders.push(introduction_book);
        }
        if (training_forwarder.experiment_definition.tasks.length != 0)
            forwarders.push(training_forwarder);
        forwarders.push(experiment_execution_forwarder);
        if (post_questionnaire != null) {
            forwarders.push(post_questionnaire);
            experiment_execution_forwarder.experiment_definition.questionnaires.push(post_questionnaire);
        }
        forwarders.push(ending_book);
        let forwarder = new _Books_Sequential_Forwarder_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Sequential_Forwarder_Forwarder(forwarders);
        return forwarder;
    }
    // WHATEVER HAPPENS ON EARTH - THIS SHOULD ONLY BE USED FOR TRAINING!
    clone() {
        let clone = new Code_Experiment_Definition(this.template.experiment_name, this.is_training, this.treatments_combinator.clone(), this.template.variables, this.template.repetitions, this.measurement, this.template.task_creator);
        return clone;
    }
}
//# sourceMappingURL=Code_Experiment_Definition.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Experiment_Definition.js":
/*!*********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Experiment_Definition.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experiment_Definition: () => (/* binding */ Experiment_Definition),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
function init() { }
class Experiment_Definition {
    constructor(experiment_name, is_training, treatments_combinator, variables, repetitions, measurement, task_creator) {
        this.questionnaires = [];
        this.tasks = [];
        this.experiment_name = experiment_name;
        this.is_training = is_training;
        this.template = { experiment_name: experiment_name, variables: variables, repetitions: repetitions, task_creator: task_creator };
        this.treatments_combinator = treatments_combinator;
        this.variables = variables;
        this.measurement = measurement;
        this.experiment_definition_task_creator = task_creator;
    }
    init_experiment(is_training) {
        this.tasks = this.treatments_combinator.create_tasks(this);
    }
    all_independent_variables() {
        return this.variables.independent_variables;
    }
    generate_csv_data() {
        let result = [];
        // let questionnaire_variables = this.questionnaire_responses = cfg.questionnaire.filter((e: Input_Object)=> !(e instanceof Information)).map((e: Input_Object)=>e.variable);
        for (let questionnaire of this.questionnaires) {
            for (let question of questionnaire.questions) {
                result.push("\"" + question.variable_name + "\"" + ";");
            }
        }
        this.variables.print_to_array(result);
        result.push("number_of_given_answers;expected_answer;given_answer;is_correct;time_in_milliseconds;\n");
        for (let task of this.tasks) {
            for (let questionnaire of this.questionnaires) {
                for (let question of questionnaire.questions) {
                    result.push("\"" + question.answer + "\"" + ";");
                }
            }
            for (let treatment_combination of task.treatment_combination.treatment_combination) {
                result.push(treatment_combination.value + ";");
            }
            result.push((task.invalid_answers.length + 1) + ";");
            result.push(task.expected_answer + ";");
            result.push(task.given_answer + ";");
            result.push("" + (task.given_answer == task.expected_answer) + ";");
            result.push(task.required_milliseconds + ";");
            task.invalid_answers.forEach((a) => result.push(a[0] + ";" + a[1] + ";"));
            result.push("\n");
        }
        return result;
    }
}
//# sourceMappingURL=Experiment_Definition.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js":
/*!***************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Experimentation.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experiment_Input_Type: () => (/* binding */ Experiment_Input_Type),
/* harmony export */   Experiment_Output_Writer: () => (/* binding */ Experiment_Output_Writer),
/* harmony export */   Free_Text_User_Input_Experiment: () => (/* binding */ Free_Text_User_Input_Experiment),
/* harmony export */   Free_Text_User_Input_Experiment_With_PrePost: () => (/* binding */ Free_Text_User_Input_Experiment_With_PrePost),
/* harmony export */   Key_Pressing: () => (/* binding */ Key_Pressing),
/* harmony export */   Measurement_Type: () => (/* binding */ Measurement_Type),
/* harmony export */   Random: () => (/* binding */ Random),
/* harmony export */   Reaction_Time: () => (/* binding */ Reaction_Time),
/* harmony export */   Reaction_Time_Measurement: () => (/* binding */ Reaction_Time_Measurement),
/* harmony export */   Reaction_Time_Penalty_Measurement: () => (/* binding */ Reaction_Time_Penalty_Measurement),
/* harmony export */   Reaction_Time_With_Penalty: () => (/* binding */ Reaction_Time_With_Penalty),
/* harmony export */   SET_SEED: () => (/* binding */ SET_SEED),
/* harmony export */   Time_To_Finish_Measurement: () => (/* binding */ Time_To_Finish_Measurement),
/* harmony export */   Time_To_Finish_With_Time_Penalty_Measurement: () => (/* binding */ Time_To_Finish_With_Time_Penalty_Measurement),
/* harmony export */   Time_to_finish: () => (/* binding */ Time_to_finish),
/* harmony export */   Time_to_finish_with_Penalty: () => (/* binding */ Time_to_finish_with_Penalty),
/* harmony export */   VARIABLE_TYPE: () => (/* binding */ VARIABLE_TYPE),
/* harmony export */   alternatives: () => (/* binding */ alternatives),
/* harmony export */   do_random_array_sort: () => (/* binding */ do_random_array_sort),
/* harmony export */   free_text: () => (/* binding */ free_text),
/* harmony export */   information: () => (/* binding */ information),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   keys_0_to_9: () => (/* binding */ keys_0_to_9),
/* harmony export */   random_array_element: () => (/* binding */ random_array_element),
/* harmony export */   random_array_element_and_remove: () => (/* binding */ random_array_element_and_remove),
/* harmony export */   random_array_element_without: () => (/* binding */ random_array_element_without),
/* harmony export */   random_array_elements_without_repetitions: () => (/* binding */ random_array_elements_without_repetitions),
/* harmony export */   random_integer_up_to_excluding: () => (/* binding */ random_integer_up_to_excluding),
/* harmony export */   random_lower_case_letter: () => (/* binding */ random_lower_case_letter),
/* harmony export */   random_lower_case_letter_except: () => (/* binding */ random_lower_case_letter_except),
/* harmony export */   random_upper_case_letter_except: () => (/* binding */ random_upper_case_letter_except),
/* harmony export */   text_input_experiment: () => (/* binding */ text_input_experiment),
/* harmony export */   text_input_experiment_with_pre_post_label: () => (/* binding */ text_input_experiment_with_pre_post_label)
/* harmony export */ });
/* harmony import */ var _modules_hard_import_seedrandom_seedrandom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules_hard_import/seedrandom/seedrandom.js */ "./N-of-1-Experimentation/modules_hard_import/seedrandom/seedrandom.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");
/* harmony import */ var _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Automata_Forwarders/Questionnaire_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js");



function init() { }
var VARIABLE_TYPE;
(function (VARIABLE_TYPE) {
    VARIABLE_TYPE[VARIABLE_TYPE["STRING"] = 1] = "STRING";
    VARIABLE_TYPE[VARIABLE_TYPE["NUMBER"] = 2] = "NUMBER";
})(VARIABLE_TYPE || (VARIABLE_TYPE = {}));
function Reaction_Time(input) {
    return (writer) => new Reaction_Time_Measurement(input(writer));
}
;
function Reaction_Time_With_Penalty(input, penalty_seconds) {
    return (writer) => new Reaction_Time_Penalty_Measurement(input(writer), penalty_seconds);
}
;
function Time_to_finish(input) {
    return (writer) => new Time_To_Finish_Measurement(input(writer));
}
function Time_to_finish_with_Penalty(input, penalty_seconds) {
    return (writer) => new Time_To_Finish_With_Time_Penalty_Measurement(input(writer), penalty_seconds);
}
function keys(key_list) {
    return (writer) => new Key_Pressing(key_list, writer);
}
function keys_0_to_9() {
    return (writer) => new Key_Pressing(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], writer);
}
function text_input_experiment(output_writer) {
    return new Free_Text_User_Input_Experiment(output_writer);
}
function text_input_experiment_with_pre_post_label(pre, post) {
    return (output_writer) => new Free_Text_User_Input_Experiment_With_PrePost(output_writer, pre, post);
}
function information(question) {
    return new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Information(question);
}
function free_text(var_name, question) {
    return new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Freetext(var_name, question);
}
function alternatives(var_name, question, alternatives) {
    return new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Alternatives(var_name, question, alternatives);
}
class Experiment_Output_Writer {
    convert_string_to_html_string(s) {
        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.convert_string_to_html_string)(s);
    }
    string_page_command(s) {
        return () => this.print_string_on_stage(s);
    }
    stage_string_pages_commands(pages) {
        let ret = [];
        for (let a of pages) {
            ret.push(this.string_page_command(a));
        }
        return ret;
    }
    get_given_answer(input) {
        return input;
    }
    print_on_input_response(given_answer) { }
    set_focus_on_input() { }
    clear_all() {
        this.clear_state();
        this.clear_stage();
    }
}
class Measurement_Type {
    constructor(input_type) {
        this.input_type = input_type;
    }
    accepted_responses() {
        return this.input_type.accepted_responses();
    }
    given_answer(i) {
        return this.input_type.given_answer(i);
    }
    start_measurement(task) {
        this.start_time = new Date().getTime().valueOf();
        task.print_task();
    }
    stop_measurement(input, task) {
        let end_time = new Date().getTime().valueOf();
        task.given_answer = this.input_type.get_given_answer(input);
        task.required_milliseconds = end_time - this.start_time;
        task.do_print_after_task_information();
    }
    incorrect_response(i, task) {
        let end_time = new Date().getTime().valueOf();
        let given_answer = task.experiment_definition.measurement.get_given_answer(i);
        task.invalid_answers.push([given_answer, end_time - this.start_time]);
        task.do_print_error_message(this.input_type.get_given_answer(i));
    }
    output_writer() {
        return this.input_type.output_writer;
    }
    get_given_answer(input) {
        return this.input_type.get_given_answer(input);
    }
    demands_penalty() {
        return false;
    }
    penalty_is_over() {
        return true;
    }
}
class Reaction_Time_Measurement extends Measurement_Type {
    constructor(input_type) {
        super(input_type);
    }
}
class Reaction_Time_Penalty_Measurement extends Measurement_Type {
    constructor(input_type, penalty_seconds) {
        super(input_type);
        this.penalty_started = false;
        this.penalty_start_point = null;
        this.penalty_miliseconds = penalty_seconds * 1000;
    }
    demands_penalty() {
        return true;
    }
    incorrect_response(i, task) {
        super.incorrect_response(i, task);
        this.penalty_started = true;
        this.penalty_start_point = new Date().getTime().valueOf();
        task.do_print_error_message(this.input_type.get_given_answer(i));
    }
    delete_penalty() {
        this.penalty_started = false;
        this.penalty_start_point = null;
    }
    penalty_is_over() {
        let diff = (new Date().getTime().valueOf()) - this.start_time;
        return !this.penalty_started || diff >= this.penalty_miliseconds;
    }
    start_measurement(task) {
        super.start_measurement(task);
        this.delete_penalty();
    }
}
class Time_To_Finish_Measurement extends Measurement_Type {
    constructor(input_type) {
        super(input_type);
    }
}
class Time_To_Finish_With_Time_Penalty_Measurement extends Time_To_Finish_Measurement {
    constructor(input_type, penalty_seconds) {
        super(input_type);
        this.penalty_started = false;
        this.penalty_start_point = null;
        this.penalty_miliseconds = penalty_seconds * 1000;
    }
    demands_penalty() {
        return true;
    }
    incorrect_response(i, task) {
        super.incorrect_response(i, task);
        this.penalty_started = true;
        this.penalty_start_point = new Date().getTime().valueOf();
        task.do_print_error_message(this.input_type.get_given_answer(i));
    }
    delete_penalty() {
        this.penalty_started = false;
        this.penalty_start_point = null;
    }
    penalty_is_over() {
        let diff = (new Date().getTime().valueOf()) - this.start_time;
        return !this.penalty_started || diff >= this.penalty_miliseconds;
    }
    start_measurement(task) {
        super.start_measurement(task);
        this.delete_penalty();
    }
}
class Experiment_Input_Type {
    constructor(output_writer) {
        this.output_writer = output_writer;
    }
    print_input_request() {
        this.output_writer.ask_for_input();
    }
    get_given_answer(input_string) {
        let value = this.output_writer.get_given_answer(input_string);
        return value;
    }
}
class Key_Pressing extends Experiment_Input_Type {
    constructor(accepted_keys, output_writer) {
        super(output_writer);
        this.accepted_keys = accepted_keys;
    }
    accepted_responses() {
        return this.accepted_keys;
    }
    given_answer(key_pressed) {
        return key_pressed;
    }
    print_input_request() {
        // I am a key....no need for input fields
    }
    get_given_answer(input_string) {
        return input_string;
    }
}
class Free_Text_User_Input_Experiment extends Experiment_Input_Type {
    constructor(output_writer) {
        super(output_writer);
    }
    accepted_responses() {
        return ["Enter"];
    }
    given_answer(key_pressed) { }
    print_input_request() {
        this.output_writer.ask_for_input();
    }
}
class Free_Text_User_Input_Experiment_With_PrePost extends Experiment_Input_Type {
    constructor(output_writer, pre, post) {
        super(output_writer);
    }
    accepted_responses() {
        return ["Enter"];
    }
    given_answer(key_pressed) { }
    print_input_request() {
        this.output_writer.ask_for_input();
    }
}
class _Random {
    constructor() {
        // @ts-ignore
        Math.seedrandom('1234567890');
    }
    // @ts-ignore
    new_random_integer(upper_limit) {
        return Math.trunc(upper_limit * Math.random());
    }
    set_seed(seed) {
        // @ts-ignore
        Math.seedrandom(seed);
    }
}
const Random = new _Random();
function SET_SEED(seed) {
    Random.set_seed(seed);
}
function random_integer_up_to_excluding(upper_limit) {
    return Random.new_random_integer(upper_limit);
}
function do_random_array_sort(array) {
    let copy = [...array];
    let result = [];
    while (copy.length > 0) {
        result.push(copy.splice(random_integer_up_to_excluding(copy.length), 1)[0]);
    }
    return result;
}
function random_array_element_and_remove(array) {
    let position = random_integer_up_to_excluding(array.length);
    let ret = array[position];
    array.splice(position, 1);
    return ret;
}
function random_array_element(array) {
    return array[random_integer_up_to_excluding(array.length)];
}
function random_array_element_without(array, exceptions) {
    let copy = array.filter(e => !exceptions.includes(e));
    return random_array_element(copy);
}
function random_array_elements_without_repetitions(array, number_of_elements_to_chose) {
    let randomly_sorted_array = do_random_array_sort(array);
    return randomly_sorted_array.slice(0, number_of_elements_to_chose);
}
function random_lower_case_letter() {
    return String.fromCharCode(97 + random_integer_up_to_excluding(26));
}
function random_lower_case_letter_except(letters) {
    while (true) {
        let ret = String.fromCharCode(97 + random_integer_up_to_excluding(26));
        if (!letters.includes(ret))
            return ret;
    }
}
function random_upper_case_letter_except(letters) {
    while (true) {
        let ret = String.fromCharCode(97 + random_integer_up_to_excluding(26)).toUpperCase();
        if (!letters.includes(ret))
            return ret;
    }
}
// This invocation just makes sure that RANDOM is loaded
(0,_modules_hard_import_seedrandom_seedrandom_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
//# sourceMappingURL=Experimentation.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Task.js":
/*!****************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Task.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
class Task {
    constructor(tc, experiment_definition, text) {
        this.expected_answer = "";
        this.given_answer = "";
        this.required_milliseconds = null;
        this.task_number_in_execution = -1;
        this.invalid_answers = [];
        this.is_training = false;
        this.has_pre_task_description = false;
        this.do_print_task = () => {
            throw new Error("Method not implemented.");
        };
        this.do_print_pre_task = () => {
            throw new Error("Method not implemented.");
        };
        this.do_print_error_message = () => {
            throw new Error("Method not implemented.");
        };
        this.accepts_answer_function = (answer) => true;
        this.do_print_after_task_information = () => {
            throw new Error("Method not implemented.");
        };
        this.treatment_combination = tc;
        this.experiment_definition = experiment_definition;
        // this.code_string(text);
    }
    accepts_answer(input) {
        let answer = this.experiment_definition.measurement.get_given_answer(input);
        return this.accepts_answer_function(answer);
    }
    next_task() {
        if (this.task_number_in_execution < this.experiment_definition.tasks.length)
            return this.experiment_definition.tasks[this.task_number_in_execution];
        else
            return null;
    }
    html_string_with_cmd(html_string, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string));
        //     cmd();
        // }
    }
    html_node_with_cmd(element, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_node(element));
        //     cmd();
        // }
    }
    after_task_string_constructor(a_string_constructor) {
        // this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
    }
    print_task() {
        this.do_print_task();
        this.print_input_request();
    }
    print_pre_task_info() {
        this.do_print_pre_task();
    }
    print_input_request() {
        this.experiment_definition.measurement.input_type.print_input_request();
    }
    treatment_value(treatment_name) {
        for (let treatment of this.treatment_combination.treatment_combination)
            if (treatment.variable.name === treatment_name)
                return treatment.value;
        throw "Unknown treatment: " + treatment_name;
    }
    set_computed_variable_value(variable_name, value) {
        for (let treatment of this.treatment_combination.treatment_combination)
            if (treatment.variable.name === variable_name) {
                treatment.value = value;
                return;
            }
        throw "Unknown treatment: " + variable_name;
    }
}
//# sourceMappingURL=Task.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Training_Configuration.js":
/*!**********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Training_Configuration.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Training_Configuration: () => (/* binding */ Training_Configuration)
/* harmony export */ });
/* harmony import */ var _treatments_Treatment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./treatments/Treatment.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js");
/* harmony import */ var _utils_loops_loop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/loops/loop.js */ "./N-of-1-Experimentation/modules/utils/loops/loop.js");
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task.js */ "./N-of-1-Experimentation/modules/Experimentation/Task.js");
/* harmony import */ var _treatments_Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./treatments/Treatment_Combination.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js");




class Training_Configuration {
    constructor(training_configuration) {
        this.can_be_cancelled = true;
        this.can_be_repeated = true;
        if (training_configuration === undefined)
            return;
        if (training_configuration.fixed_treatments != undefined)
            this.fixed_treatments = training_configuration.fixed_treatments;
        this.can_be_cancelled = training_configuration.can_be_cancelled;
        this.can_be_repeated = training_configuration.can_be_repeated;
    }
    init_experiment(experiment_definition) {
        experiment_definition.tasks = [];
        if (this.fixed_treatments != undefined) {
            for (let a_treatment_combination of this.fixed_treatments) {
                let treatment_combination = new _treatments_Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_3__.Treatment_Combination([]);
                (0,_utils_loops_loop_js__WEBPACK_IMPORTED_MODULE_1__.iterate_both)(experiment_definition.all_independent_variables(), a_treatment_combination, (variable, value) => {
                    treatment_combination.treatment_combination.push(new _treatments_Treatment_js__WEBPACK_IMPORTED_MODULE_0__.Treatment(variable, value));
                });
                let task = new _Task_js__WEBPACK_IMPORTED_MODULE_2__.Task(treatment_combination, experiment_definition, "");
                task.is_training = true;
                experiment_definition.experiment_definition_task_creator(task);
                experiment_definition.tasks.push(task);
            }
        }
        else {
            experiment_definition.init_experiment(true);
        }
    }
}
//# sourceMappingURL=Training_Configuration.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/functions/create_code_experiment_execution.js":
/*!******************************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/functions/create_code_experiment_execution.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_code_experiment_execution: () => (/* binding */ create_code_experiment_execution)
/* harmony export */ });
/* harmony import */ var _treatments_Treatments_Combinator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../treatments/Treatments_Combinator.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatments_Combinator.js");
/* harmony import */ var _Code_Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Code_Experiment_Definition.js */ "./N-of-1-Experimentation/modules/Experimentation/Code_Experiment_Definition.js");
/* harmony import */ var _Training_Configuration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Training_Configuration.js */ "./N-of-1-Experimentation/modules/Experimentation/Training_Configuration.js");
/* harmony import */ var _treatments_Independent_Variables_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../treatments/Independent_Variables.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variables.js");




function create_code_experiment_execution(cfg) {
    let variables = _treatments_Independent_Variables_js__WEBPACK_IMPORTED_MODULE_3__.Independent_Variables.from_layout(cfg.layout);
    let all_treatment_combinations = new _treatments_Treatments_Combinator_js__WEBPACK_IMPORTED_MODULE_0__.Treatments_Combinator(variables, cfg.repetitions);
    let experiment_definition = new _Code_Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_1__.Code_Experiment_Definition(cfg.experiment_name, false, all_treatment_combinations, variables, cfg.repetitions, cfg.measurement, cfg.task_configuration);
    let training_configuration = new _Training_Configuration_js__WEBPACK_IMPORTED_MODULE_2__.Training_Configuration(cfg.training_configuration);
    let experiment_execution = experiment_definition.create_code_all_experiment_automatas({
        seed: cfg.seed,
        introduction_texts: cfg.introduction_pages,
        post_questionnaire: cfg.post_questionnaire,
        pre_run_training_output: cfg.pre_run_training_output,
        training_configuration: training_configuration,
        // post_run_training_output: cfg.post_run_training_output,
        pre_run_experiment_output: cfg.pre_run_experiment_output,
        // post_run_experiment_output: cfg.post_run_experiment_output,
        finish_texts: cfg.finish_pages,
        measurement: cfg.measurement,
        finish_function: cfg.finish_function
    });
    return experiment_execution;
}
//# sourceMappingURL=create_code_experiment_execution.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variable.js":
/*!*******************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variable.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Independent_Variable: () => (/* binding */ Independent_Variable)
/* harmony export */ });
/* harmony import */ var _Treatment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Treatment.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js");

class Independent_Variable {
    constructor(name, treatments) {
        this.treatments = [];
        this.name = name;
        for (let aString of treatments) {
            this.treatments.push(new _Treatment_js__WEBPACK_IMPORTED_MODULE_0__.Treatment(this, aString));
        }
    }
}
//# sourceMappingURL=Independent_Variable.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variables.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variables.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Independent_Variables: () => (/* binding */ Independent_Variables)
/* harmony export */ });
/* harmony import */ var _Independent_Variable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Independent_Variable.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variable.js");
/* harmony import */ var _utils_arrays_all_array_combinations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/arrays/all_array_combinations.js */ "./N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js");
/* harmony import */ var _Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Treatment_Combination.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js");



class Independent_Variables {
    constructor() {
        this.independent_variables = [];
    }
    push_variable(n, treatments) {
        this.independent_variables.push(new _Independent_Variable_js__WEBPACK_IMPORTED_MODULE_0__.Independent_Variable(n, treatments));
    }
    print_to_array(result) {
        for (let variable of this.independent_variables) {
            result.push(variable.name + ";");
        }
    }
    create_treatment_combinations() {
        let treatment_combinations = [];
        (0,_utils_arrays_all_array_combinations_js__WEBPACK_IMPORTED_MODULE_1__.all_array_combinations)(this.independent_variables.map(t => t.treatments), (treatments) => {
            treatment_combinations.push(new _Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_2__.Treatment_Combination([...treatments]));
        });
        return treatment_combinations;
    }
    get_variable_named(var_name) {
        for (let v of this.independent_variables) {
            if (v.name === var_name)
                return v;
        }
        throw "Unknown independent variable named: " + var_name;
    }
    static from_layout(layout) {
        let variables = new Independent_Variables();
        for (let aVar of layout) {
            variables.push_variable(aVar.variable, aVar.treatments);
        }
        return variables;
    }
}
//# sourceMappingURL=Independent_Variables.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js":
/*!********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Treatment: () => (/* binding */ Treatment)
/* harmony export */ });
class Treatment {
    constructor(variable, value) {
        this.variable = variable;
        this.value = "" + value;
    }
    clone() {
        let ret = new Treatment(this.variable, this.value);
        return ret;
    }
}
//# sourceMappingURL=Treatment.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Treatment_Combination: () => (/* binding */ Treatment_Combination)
/* harmony export */ });
class Treatment_Combination {
    constructor(treatment_combination) {
        this.treatment_combination = [];
        this.treatment_combination = treatment_combination;
    }
    clone() {
        let ret = new Treatment_Combination([]);
        for (let treatment of this.treatment_combination) {
            ret.treatment_combination.push(treatment.clone());
        }
        return ret;
    }
}
//# sourceMappingURL=Treatment_Combination.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatments_Combinator.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Treatments_Combinator.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Treatments_Combinator: () => (/* binding */ Treatments_Combinator)
/* harmony export */ });
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Task.js */ "./N-of-1-Experimentation/modules/Experimentation/Task.js");
/* harmony import */ var _Experimentation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Experimentation.js */ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js");


/**
 * All experiment definitions contain the treatment combinations (including repetitions)
 */
class Treatments_Combinator {
    constructor(variables, repetitions) {
        this.variables = variables;
        this.repetitions = repetitions;
    }
    clone() {
        return new Treatments_Combinator(this.variables, this.repetitions);
    }
    create_treatment_combinations() {
        let treatment_combinations = [];
        for (let r = 0; r < this.repetitions; r++) {
            treatment_combinations = treatment_combinations.concat(this.variables.create_treatment_combinations());
        }
        return treatment_combinations;
    }
    create_tasks(experiment_definition) {
        let tasks = [];
        for (let treatment_combination of this.create_treatment_combinations()) {
            let task = new _Task_js__WEBPACK_IMPORTED_MODULE_0__.Task(treatment_combination.clone(), experiment_definition, "");
            try {
                experiment_definition.experiment_definition_task_creator(task);
            }
            catch (ex) {
                console.log("halt");
                experiment_definition.experiment_definition_task_creator(task);
            }
            task.is_training = experiment_definition.is_training;
            tasks.push(task);
        }
        return (0,_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.do_random_array_sort)(tasks);
    }
    get_variable_named(var_name) {
        return this.variables.get_variable_named(var_name);
    }
}
//# sourceMappingURL=Treatments_Combinator.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/Utils.js":
/*!*******************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/Utils.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RefObject: () => (/* binding */ RefObject),
/* harmony export */   add_upload_push_button: () => (/* binding */ add_upload_push_button),
/* harmony export */   array_to_sequence_of_size_: () => (/* binding */ array_to_sequence_of_size_),
/* harmony export */   cartesian_product: () => (/* binding */ cartesian_product),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   convert_string_to_html_string: () => (/* binding */ convert_string_to_html_string),
/* harmony export */   csv_encoding: () => (/* binding */ csv_encoding),
/* harmony export */   guarantee_test: () => (/* binding */ guarantee_test),
/* harmony export */   guarantee_true: () => (/* binding */ guarantee_true),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   key_event_string: () => (/* binding */ key_event_string),
/* harmony export */   save_file_in_html: () => (/* binding */ save_file_in_html),
/* harmony export */   upload_experiment_to_server: () => (/* binding */ upload_experiment_to_server)
/* harmony export */ });
/* harmony import */ var _Utils_Test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils_Test.js */ "./N-of-1-Experimentation/modules/utils/Utils_Test.js");

function init() { }
class RefObject {
    constructor(value) {
        this.value = value;
    }
}
function contains(collection, element) {
    return collection.indexOf(element) != -1;
}
function cartesian_product(arr1, arr2, f) {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; i < arr2.length; i++) {
            f(arr1[i], arr2[j]);
        }
    }
}
function guarantee_test(f) {
    let result = f();
    if (!result)
        throw "Something is wrong here";
}
function guarantee_true(trueFalse) {
    if (!trueFalse)
        throw "Something is wrong here";
}
function convert_string_to_html_string(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\n/g, "<br/>")
        .replace(/ /g, '&nbsp;');
}
function key_event_string(event) {
    var postfix = "";
    if (event.key == "Alt")
        if (event.ctrlKey)
            return "Alt+Ctrl";
    if (event.key == "Control")
        if (event.altKey)
            return "Ctrl+Alt";
    postfix = postfix + (event.altKey ? "+Alt" : "");
    postfix = postfix + (event.ctrlKey ? "+Control" : "");
    if (event.key == "Alt")
        return "Alt";
    // if(event.key=="Control") return postfix;
    return "" + event.key + postfix;
}
function array_to_sequence_of_size_(sequence) {
    var ret = [];
    var counter = 0;
    for (var element of sequence) {
        ret.push(counter);
        counter++;
    }
    return ret;
}
function csv_encoding(a_string) {
    let add_escapes = a_string.split("\"").join("\"\"");
    return "\"" + add_escapes + "\"";
}
function save_file_in_html(filename, data) {
    const blob = new Blob(data, { type: 'application/ssc' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
function add_upload_push_button(url, button_test, data) {
    const elem = window.document.createElement('form');
    elem.setAttribute("action", url);
    elem.setAttribute("method", "post");
    const i = window.document.createElement('input');
    i.setAttribute("name", "data");
    i.setAttribute("type", "hidden");
    i.setAttribute("value", data);
    elem.appendChild(i);
    const j = window.document.createElement('input');
    j.setAttribute("value", button_test);
    j.setAttribute("type", "submit");
    elem.appendChild(j);
    document.body.appendChild(elem);
}
function upload_experiment_to_server(experiment) {
    let csv = experiment.generate_csv_data();
    let currentUrl = window.location.href;
    // const response = fetch('http://127.0.0.1:8088', {
    //     method: 'POST',
    //     body: JSON.stringify({experiment_name : "dummy2", experiment_data: data}),
    //     headers: {'Content-Type': 'application/json; charset=UTF-8'} })
    console.log(currentUrl);
}
(0,_Utils_Test_js__WEBPACK_IMPORTED_MODULE_0__.do_tests)();
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/Utils_Test.js":
/*!************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/Utils_Test.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   do_tests: () => (/* binding */ do_tests)
/* harmony export */ });
// Does not do anything any longer. I still keep it here - probably need it in the future.
// Is executed by Utils.
function do_tests() {
    // let encoded_string = "";
    //
    // encoded_string =csv_encoding('"');
    // console.log(encoded_string);
    //
    // encoded_string = csv_encoding('""');
    // console.log(encoded_string);
    //
    // encoded_string = csv_encoding('""""""""""');
    // console.log(encoded_string);
    //
    // encoded_string = csv_encoding('";');
    // console.log(encoded_string);
}
//# sourceMappingURL=Utils_Test.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js":
/*!*******************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   all_array_combinations: () => (/* binding */ all_array_combinations),
/* harmony export */   all_different_x_tupel: () => (/* binding */ all_different_x_tupel),
/* harmony export */   all_x_tupel: () => (/* binding */ all_x_tupel)
/* harmony export */ });
function all_array_combinations_internal(arr, combination, f) {
    if (arr.length == 0) {
        f(combination);
    }
    else {
        let last = arr.shift();
        for (let e of last) {
            combination.push(e);
            all_array_combinations_internal(arr, combination, f);
            combination.pop();
        }
        arr.unshift(last);
    }
}
/**
 *  @param arr: An array of arrays
 *  executes for all combinations of arrays the function f
 */
function all_array_combinations(arr, f) {
    all_array_combinations_internal(arr, [], f);
}
/**
 * Examples:
 *   all_x_tupel(1, [1, 2, 3]) = [1, 2, 3]
 *   all_x_tupel(2, [1, 2, 3]) = [[1, 1], [1,2]], [1,3], [2,1]....[3,3]]

 */
function all_x_tupel(tupel_length, arr) {
    let result = [];
    if (tupel_length == 1) {
        for (let e of arr) {
            result.push([e]);
        }
        return result;
    }
    let x_minus_one_tupel = all_x_tupel(tupel_length - 1, arr);
    for (let e of arr) {
        for (let a_x_minux_one_tupel of x_minus_one_tupel) {
            result.push([e, ...a_x_minux_one_tupel]);
        }
    }
    return result;
}
/**
 * Examples:
 *   all_different_x_tupel(3, [1, 2, 3]) = [[1, 2, 3], [1,3,2], [2,1,3], [2,3,1]. [3,1,2], [3,2,1]]
 *
*/
function all_different_x_tupel(tupel_length, arr) {
    let result = [];
    if (tupel_length == 1) {
        for (let e of arr) {
            result.push([e]);
        }
        return result;
    }
    for (let e = 0; e < arr.length; e++) {
        let arr_without_current_element = arr.slice();
        arr_without_current_element.splice(e, 1);
        let x_minus_one_tupel = all_different_x_tupel(tupel_length - 1, arr_without_current_element);
        for (let a_x_minux_one_tupel of x_minus_one_tupel) {
            result.push([arr[e], ...a_x_minux_one_tupel]);
        }
    }
    return result;
}
//# sourceMappingURL=all_array_combinations.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/loops/loop.js":
/*!************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/loops/loop.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Iterator: () => (/* binding */ Iterator),
/* harmony export */   Repeat: () => (/* binding */ Repeat),
/* harmony export */   iterate: () => (/* binding */ iterate),
/* harmony export */   iterate_both: () => (/* binding */ iterate_both),
/* harmony export */   iterate_with_counter: () => (/* binding */ iterate_with_counter),
/* harmony export */   repeat: () => (/* binding */ repeat),
/* harmony export */   repeat_: () => (/* binding */ repeat_),
/* harmony export */   repeat_n_times: () => (/* binding */ repeat_n_times)
/* harmony export */ });
function iterate_with_counter(array, f) {
    let counter = 0;
    for (let e of array) {
        f(e, counter++);
    }
}
function iterate_both(a1, a2, f) {
    if (a1.length > a2.length)
        throw "Cannot loop both: first array has length: " + a1.length + ", but second has length " + a2.length;
    let counter = 0;
    for (let e of a1) {
        f(e, a2[counter++]);
    }
}
function iterate(array) {
    return new Iterator(array);
}
class Iterator {
    constructor(array) {
        this.array = array;
    }
    do(f) {
        for (let element of this.array)
            f(element);
    }
    do_with_counter(f) {
        for (let c = 0; c < this.array.length; c++) {
            f(this.array[c], c);
        }
    }
}
function repeat(n, f) {
    for (let c = 0; c < n; c++) {
        f(c);
    }
    // return new Repeat(0)
}
function repeat_n_times(n) {
    return new Repeat(n);
}
function repeat_(n) {
    return new Repeat(n);
}
class Repeat {
    constructor(counter) {
        this.counter = counter;
    }
    and_collect(f) {
        let arr = [];
        for (let c = 1; c <= this.counter; c++) {
            arr.push(f(c));
        }
        return arr;
    }
    _times(f) {
        for (let c = 1; c <= this.counter; c++) {
            f();
        }
    }
    times(f) {
        for (let c = 1; c <= this.counter; c++) {
            f(c);
        }
    }
}
//# sourceMappingURL=loop.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules_hard_import/seedrandom/seedrandom.js":
/*!*****************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules_hard_import/seedrandom/seedrandom.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INIT_RANDOM: () => (/* binding */ INIT_RANDOM),
/* harmony export */   "default": () => (/* binding */ dummy)
/* harmony export */ });
/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto          // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) {
          math[rngname] = prng;
          return seed;
        }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    // console.log(obj);
    for (prop in obj) {
      // console.log(prop);
      try {
        result.push(
            flatten(
                obj[
                    prop
                ],
                depth - 1)
        );
      } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {

    nodecrypto = require('crypto');
    var out = crypto.randomByte
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  math['seed' + rngname] = seedrandom;
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
} else {
  // When included as a plain script, set up Math.seedrandom global.
  math['seed' + rngname] = seedrandom;
}

  // module.exports = seedrandom;

// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : undefined,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

function INIT_RANDOM(){
  console.log("DONE");
}

function dummy() {
  console.log("DONE");
}

console.log("RANDOM_INIT");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************************************!*\
  !*** ./2025_my_test/typescript/experiment_count_states.ts ***!
  \************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _N_of_1_Experimentation_modules_Experimentation_Browser_Output_Writer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js */ "./N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js");
/* harmony import */ var _N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js */ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js");
/* harmony import */ var _code_Feature_count_states_2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code/Feature_count_states_2.js */ "./2025_my_test/typescript/code/Feature_count_states_2.js");



let SEED = "39";
(0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.SET_SEED)(SEED);
//let tasks = create_tasks_grouped_by_tool();
//let tasks = create_tasks_grouped_by_error_position();
let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Count-States-Experiment",
        seed: SEED,
        introduction_pages: [
            //() => writer.print_string_on_stage(
            //    "Thank you for participating in the experiment. This experiment compares four different global state management tools in terms of readability.<br><br>" +
            //    "<p>Before starting, please switch your browser to full-screen mode (press <code>[F11]</code>).</p>" +
            //    "The next page introduces the state management tools."),
            () => writer.print_string_on_stage("Thank you for participating in this experiment.<br><br>" +
                "This study evaluates how easily developers can understand global state management tools in React by inspecting code snippets.<br><br>" +
                "Your task will be to read code examples and count the number of <strong>valid exported global states</strong> (not actions).<br><br>" +
                "<p>Before starting, please switch your browser to full-screen mode by pressing <code>[F11]</code> on your keyboard.</p>"
            //"Click 'Next' to begin with a short introduction to global state and the tools you'll encounter."
            ),
            () => writer.print_string_on_stage("In React, 'state' refers to data that a component uses to render content or perform logic. For example, a user's name, a counter, or a checkbox value are all forms of state.<br><br>" +
                "Sometimes, this state needs to be shared between different parts of the app. When that happens, we call it <strong>global state</strong>.<br><br>" +
                "Global state management tools help developers manage shared data in a clean, structured way. In this experiment, we will compare four such tools."),
            () => writer.print_string_on_stage("Your task is to analyze short code snippets using four different state management tools: <strong>Context</strong>, <strong>Zustand</strong>, <strong>Redux</strong>, and <strong>Jotai</strong>.<br><br>" +
                "For each snippet, count how many <strong>global states</strong> (not actions or functions) are <em>correctly defined and exported</em>.<br><br>" +
                "<strong>Important:</strong> Some tools will contain code errors. Only count a state if it is:<br>" +
                "<ul>" +
                "<li>Defined properly</li>" +
                "<li>Used correctly</li>" +
                "<li>Included in the tool’s export or value structure</li>" +
                "</ul>" +
                "Enter a number between 0 and 9 as your answer for each snippet."),
            () => writer.print_string_on_stage("<strong>Context</strong> is a built-in feature of React that allows you to share state across components without passing props manually.<br><br>" +
                "In this experiment, check if each state is:<br>" +
                "1. Declared in the interface, <span style='display:inline-block; width:12px; height:12px; background:darkblue; margin-left:5px;'></span><br>" +
                "2. created with <code>useState()</code>, and <span style='display:inline-block; width:12px; height:12px; background:darkgreen; margin-left:5px;'></span><br>" +
                "3. Passed into the <code>value</code> of the context provider. <span style='display:inline-block; width:12px; height:12px; background:darkred; margin-left:5px;'></span><br><br>" +
                "Ignore any functions inside the <code>interface</code> as they are not states." +
                "<table style='border: 1px solid black;'>" +
                "<tr><td style='border: 3px solid darkblue; padding: 5px;'><code>" +
                "interface testType {<br>" +
                "&nbsp;&nbsp;a: number,<br>" +
                "&nbsp;&nbsp;b: () => void,<br>" +
                "&nbsp;&nbsp;c: number,<br>" +
                "}</td></tr>" +
                "<tr><td style='border: 3px solid darkgreen; padding: 5px;'><code>" +
                "export const TestProvider = ({children}) => {<br>" +
                "&nbsp;&nbsp;const [a, setA] = useState<number>(0);<br>" +
                "&nbsp;&nbsp;const b = () => {<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;setA(10);<br>" +
                "&nbsp;&nbsp;};<br>" +
                "</td></tr>" +
                "<tr><td style='border: 3px solid darkred; padding: 5px;'><code>" +
                "&nbsp;&nbsp;return (<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&lt;TestContext.Provider value={{ a, b }}&gt;<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{children}" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&lt;/TestContext.Provider&gt;<br>" +
                "&nbsp;&nbsp;)<br>" +
                "}</td></tr>" +
                "</table></code>" +
                "<br> In this case <strong>'a'</strong> is a state that meets all three criteria and can be counted, while <strong>'c'</strong> is only declared in the <code>interface</code> but not fulfilling the other conditions, therefore it should <strong>NOT</strong> be counted!" +
                "<br> Contrary to <strong>'c'</strong>, <strong>'b'</strong> also is declared, created and passed in the value of the provider, but it is a function and not a state, therefore it is not to be counted aswell.<br><br>" +
                "<strong>Only count states that meet all three criteria and ignore any functions as they are not states.</strong>"),
            () => writer.print_string_on_stage("" +
                "In <strong>Zustand</strong>, you define a store using the <code>create()</code> function. The store allows global state management and includes:<br>" +
                "<ul>" +
                "<li>Simple key-value pairs for state</li>" +
                "<li>Functions (methods) to modify the state</li>" +
                "</ul>" +
                "In this experiment, count every state that is:<br>" +
                "1. Declared in the <code>type</code>, and <span style='display:inline-block; width:12px; height:12px; background:darkblue; margin-left:5px;'></span><br>" +
                "2. Implemented correctly inside the store function. <span style='display:inline-block; width:12px; height:12px; background:darkgreen; margin-left:5px;'></span><br>" +
                "Some states may be declared but never initialized, or used without being typed. These should not be counted.<br><br>" +
                "Ignore any functions inside the store as they are not states.<br><br>" +
                "<table style='border: 1px solid black;'>" +
                "<tr><td style='border: 3px solid darkblue; padding: 5px;'><code>" +
                "type testState = {<br>" +
                "&nbsp;&nbsp;a: number,<br>" +
                "&nbsp;&nbsp;b: () => void,<br>" +
                "&nbsp;&nbsp;c: number,<br>" +
                "}</td></tr>" +
                "<tr><td style='border: 3px solid darkgreen; padding: 5px;'><code>" +
                "export const useTestState = create<testState>()((set) => ({<br>" +
                "&nbsp;&nbsp;a: 0,<br>" +
                "&nbsp;&nbsp;b: () => {<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;set((state) => {a: 10})<br>" +
                "&nbsp;&nbsp;},<br>" +
                "}))<br>" +
                "</td></tr>" +
                "</table></code>" +
                "<br> In this case <strong>'a'</strong> is a state that meets both criteria and can be counted, while <strong>'c'</strong> is only declared in the <code>type</code> but not fulfilling the other condition, therefore it should <strong>NOT</strong> be counted!" +
                "<br> Contrary to <strong>'c'</strong>, <strong>'b'</strong> also is declared in the <code>type</code>, but it is a function and not a state, therefore it is not to be counted aswell.<br><br>" +
                "<strong>Only count states that meet both criteria and ignore any functions/actions as they are not states.</strong>"),
            () => writer.print_string_on_stage("In <strong>Redux</strong>, state is stored in a central object called the <code>initialState</code> and updated using <code>reducers</code> and the <code>actions</code> defined in it.<br><br>" +
                "To count a valid state in this experiment, it must:<br>" +
                "1. Be listed in the <code>interface</code> definition, and <span style='display:inline-block; width:12px; height:12px; background:darkblue; margin-left:5px;'></span><br>" +
                "2. Be present in the <code>initialState</code> <span style='display:inline-block; width:12px; height:12px; background:darkgreen; margin-left:5px;'></span><br>" +
                "Some states may be declared but never initialized, or used without being typed. These should not be counted.<br><br>" +
                "The actions inside the <code>reducers</code> can be ignored for this experiment.<br><br>" +
                "<table style='border: 1px solid black;'>" +
                "<tr><td style='border: 3px solid darkblue; padding: 5px;'><code>" +
                "interface testState {<br>" +
                "&nbsp;&nbsp;a: number,<br>" +
                "&nbsp;&nbsp;b: number,<br>" +
                "}</td></tr>" +
                "<tr><td style='border: 3px solid darkgreen; padding: 5px;'><code>" +
                "const initialState: testState = {<br>" +
                "&nbsp;&nbsp;a: 0<br>" +
                "}</td></tr>" +
                "<tr><td style='border: 3px solid darkred; padding: 5px;'><code>" +
                "export const testSlice = createSlice({<br>" +
                "&nbsp;&nbsp;name: 'testState',<br>" +
                "&nbsp;&nbsp;initialState,<br>" +
                "&nbsp;&nbsp;reducers: {<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;...<br>" +
                "&nbsp;&nbsp;},<br>" +
                "});</td></tr>" +
                "</table></code>" +
                "<br> In this case <strong>'a'</strong> is a state that meets both criteria and can be counted, while <strong>'b'</strong> is only declared in the <code>interface</code> but not fulfilling the other condition, therefore it should <strong>NOT</strong> be counted!<br><br>" +
                "<strong>Only count states that meet both criteria and ignore any functions/actions as they are not states.</strong>"),
            () => writer.print_string_on_stage("<strong>Jotai</strong> is a state management library for React that uses <em>atoms</em> as basic units of state.<br><br>" +
                "Each atom is a standalone piece of state created using <code>atom()</code>.<br><br>" +
                "Jotai does not use context, reducers, or slices — just simple atoms.<br><br>" +
                //"In this experiment, the task is to only count atoms that hold an actual value (e.g., <code>const a = atom(0);</code>), which serve as a state.<br><br>" +
                "In this experiment, the task is to only count atoms that hold an actual value, which serve as a state.<span style='display:inline-block; width:12px; height:12px; background:green; margin-left:5px;'></span><br>" +
                "Write-only atoms can be ignored.<span style='display:inline-block; width:12px; height:12px; background:red; margin-left:5px;'></span><br><br>" +
                //"Write-only atoms like this:<br><table style='border: 1px solid black;'><td style='padding: 5px;'><code>const b = atom(<br>" +
                //"&nbsp;&nbsp;null,<br>" +
                //"&nbsp;&nbsp;(get, set) => {<br>" +
                //"&nbsp;&nbsp;&nbsp;&nbsp;set(a, 10 )<br>" +
                //"&nbsp;&nbsp;}<br>" +
                //");</td></table></code>" +
                "<table style='border: 1px solid black;'>" +
                "<tr><td style='border: 3px solid green; padding: 5px;'><code>" +
                "const a = atom(0);<br>" +
                "<code></td></tr>" +
                "<tr><td style='border: 3px solid red; padding: 5px;'><code>" +
                "const initialState: testState = {<br>" +
                "const b = atom(<br>" +
                "&nbsp;&nbsp;(get, set) => {<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;set(a, 10 )<br>" +
                "&nbsp;&nbsp;}<br>" +
                ");<code></td></tr>" +
                "</table>" +
                "<br> In this case <strong>'a'</strong> is an <code>atom</code> that serves as a state and can be counted!" +
                "<br> Contrary to <strong>'a'</strong>, <strong>'b'</strong> is a write-only <code>atom</code> and should therefore not be counted.<br><br>" +
                "<strong>Only count states that meet the criteria and ignore any write-only atoms.</strong>" +
                "<br><br>Ok, you are now ready to start with the training phase (that you enter by pressing <code>[Enter]</code>)."),
            /*
            () => writer.print_string_on_stage(
                "<strong>Before you start, here’s a quick checklist:</strong><br><br>" +
                "<ul>" +
                "<li><strong>Only count actual states</strong>, not functions or actions.</li>" +
                "<li>State must be <strong>correctly defined and exported</strong> in the example.</li>" +
                "<li>Each tool has slightly different rules — refer back if unsure.</li>" +
                "<li>Jotai examples are error-free. The others may contain mistakes you must detect.</li>" +
                "</ul>" +
                "Now you're ready to begin!<br><br>"
            ),
            */
        ],
        pre_run_training_instructions: writer.string_page_command("You entered the training phase. In the training phase, you get a random set of tasks, showing code for one of the previously explained tools.<br><br>" +
            "Please, run the training until you feel familiar with the experiment. This could be - for example - the case when you correctly answered the tasks 10 times.<br><br>" +
            "You can interrupt the training phase by pressing [ESC]. Otherwise, the training phase will be repeated.<br><br>" +
            "<b>Note that you can see that you are in the training phase (top, right of the screen says <code>Training</code>)</b><br><br>" +
            "Note that you give a response to a question by pressing a number between [0], and [9]. <br><br>" +
            "It is also advised to adjust the overall display scale of the page to see the whole code via <strong>CTRL</strong> + <strong>Mouse Wheel</strong> ."),
        pre_run_experiment_instructions: writer.string_page_command(writer.convert_string_to_html_string("You are now entering the experiment phase.")),
        /*
        post_questionnaire: [
            alternatives("Experience", "How experienced are you with React and Jotai?", [
                "No experience",
                "Beginner",
                "Intermediate",
                "Advanced",
                "Expert"
            ]),
            alternatives("Debugging", "How comfortable are you with debugging state management issues?", [
                "Not comfortable",
                "Somewhat comfortable",
                "Comfortable",
                "Very comfortable"
            ]),
        ],

        */
        finish_pages: [
            writer.string_page_command("<p>Experiment complete. Next, your data will be downloaded.</p>")
        ],
        layout: [
            //{ variable: "has_error", treatments: ["true", "false"] },
            //{ variable: "State_Management_Tool", treatments: ["Redux", "Jotai", "Context", "Zustand"] },
            { variable: "State_Management_Tool", treatments: ["Redux", "Jotai", "Context", "Zustand", "Redux_Error", "Context_Error", "Zustand_Error"] },
            //{ variable: "Amount_Group", treatments: ["0", "1", "2"] },
            { variable: "Amount_Group", treatments: ["0", "1"] },
            //{ variable: "amount_states", treatments: [""] },
        ],
        repetitions: 4,
        measurement: (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.Reaction_Time)((0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.keys)(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])),
        //measurement: Time_to_finish(text_input_experiment),
        task_configuration: (t) => {
            let smt = t.treatment_value("State_Management_Tool");
            let amt = t.treatment_value("Amount_Group");
            let task = new _code_Feature_count_states_2_js__WEBPACK_IMPORTED_MODULE_2__.Code_Generation_Task(false, smt, amt);
            //let task: Code_Generation_Task = random_array_element(tasks["" + t.treatment_value("State_Management_Tool")]);
            let code = task.generate_code();
            t.has_pre_task_description = true;
            t.do_print_pre_task = () => {
                //writer.print_string_on_stage(task_generator[0]);
                //let smt = task.stateManagementTool;
                const cleaned = String(smt).replace(/_Error$/, "");
                writer.print_string_on_stage("The next State Management Tool will be: " + cleaned);
                writer.print_string_on_stage("Press [Return].");
            };
            t.do_print_task = () => {
                //let code = task.generate_code();
                //let he = t.treatment_value("has_error");
                //let smt = t.treatment_value("State_Management_Tool");
                writer.clear_stage();
                //writer.print_html_on_stage(task.generate_code());
                writer.print_string_on_stage("<div class='sourcecode'>" + code + "</div>");
                t.expected_answer = task.answer;
            };
            t.do_print_after_task_information = () => {
                let error_msg = task.response_text();
                console.log(error_msg);
                //writer.clear_stage();
                if (t.given_answer == t.expected_answer) {
                    writer.print_string_on_stage("<div class='correct'>" + "CORRECT! Given answer: " + t.given_answer + "\n" + error_msg + "</div>");
                }
                else {
                    writer.print_error_string_on_stage(writer.convert_string_to_html_string("WRONG! Given answer: " + t.given_answer + "\n" + error_msg));
                }
                //task.debug_help(t);
            };
        }
    };
};
(0,_N_of_1_Experimentation_modules_Experimentation_Browser_Output_Writer_js__WEBPACK_IMPORTED_MODULE_0__.BROWSER_EXPERIMENT)(experiment_configuration_function);

})();

/******/ })()
;
//# sourceMappingURL=experiment_configuration.js.map