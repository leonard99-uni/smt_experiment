import { BROWSER_EXPERIMENT } from "../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js";
import { keys, Reaction_Time, SET_SEED } from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import { Code_Generation_Task, get_tasks_explanation } from "./code/Feature_count_states_2.js";
let SEED = "39";
SET_SEED(SEED);
let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Count-States-Experiment",
        seed: SEED,
        introduction_pages: [
            () => writer.print_string_on_stage("Thank you for participating in this experiment.<br><br>" +
                "This study evaluates how easily developers can understand global state management tools in React by inspecting code snippets.<br><br>" +
                "Your task will be to read code examples and count the number of <strong>valid exported global states</strong> (not actions).<br><br>" +
                "<p>Before starting, please switch your browser to full-screen mode by pressing <code>[F11]</code> on your keyboard.</p>"),
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
            () => writer.print_string_on_stage("The following examples demonstrate key <strong>React</strong> features such as <code>useState</code> and component props.<br><br>" +
                "The <code>useState</code> Hook is used to add state to a functional component. For example:<br>" +
                "<code>const [count, setCount] = useState(0);</code><br><br>" +
                "This initializes a state variable named <code>count</code> and a corresponding function, <code>setCount</code>, for updating its value.<br><br>" +
                "While direct usage of these features is not required, recognizing their purpose will help in understanding the code examples provided."),
            () => writer.print_string_on_stage("Throughout the examples, there are often function types written like this:<br><br>" +
                "<code>a: () => void</code><br><br>" +
                "This means <code>a</code> is a function that takes no arguments and returns nothing (i.e., <code>void</code>).<br><br>" +
                "Although this may appear in interfaces or stores, please note that <strong>functions like this are not considered state</strong> and should not be included in the experiment."),
            () => writer.print_string_on_stage("<strong>Context</strong> is a built-in feature of React that allows you to share state across components without passing props manually.<br><br>" +
                "In this experiment, check if each state is:<br>" +
                "1. Declared in the interface, <span style='display:inline-block; width:12px; height:12px; background:darkblue; margin-left:5px;'></span><br>" +
                "2. created with <code>useState()</code>, and <span style='display:inline-block; width:12px; height:12px; background:darkgreen; margin-left:5px;'></span><br>" +
                "3. Passed into the <code>value</code> of the context provider. <span style='display:inline-block; width:12px; height:12px; background:aqua; margin-left:5px;'></span><br><br>" +
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
                "<tr><td style='border: 3px solid aqua; padding: 5px;'><code>" +
                "&nbsp;&nbsp;return (<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&lt;TestContext.Provider value={{ a, b, c, d }}&gt;<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{children}" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&lt;/TestContext.Provider&gt;<br>" +
                "&nbsp;&nbsp;)<br>" +
                "}</td></tr>" +
                "</table></code>" +
                "<br> In this case <strong>'a'</strong> is a state that meets all three criteria and can be counted, while <strong>'c'</strong> is only declared in the <code>interface</code> and passed in the value of the <code>provider</code> but not fulfilling the other conditions, therefore it should <strong>NOT</strong> be counted!" +
                "<br> Contrary to <strong>'c'</strong>, <strong>'b'</strong> also is declared, created and passed in the value of the provider, but it is a function and not a state, therefore it is not to be counted aswell." +
                "<br> Finally, <strong>'d'</strong> is only passed as a value of the provider but does not fulfill the other condition, therefore it should <strong>NOT</strong> be counted!<br><br>" +
                "<strong>Only count states that meet all three criteria and ignore any functions.</strong>"),
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
                "<strong>Only count states that meet both criteria and ignore any functions/actions.</strong>"),
            () => writer.print_string_on_stage("In <strong>Redux</strong>, state is stored in a central object called the <code>initialState</code> and updated using <code>reducers</code> and the <code>actions</code> defined in it.<br><br>" +
                "To count a valid state in this experiment, it must:<br>" +
                "1. Be listed in the <code>interface</code> definition, and <span style='display:inline-block; width:12px; height:12px; background:darkblue; margin-left:5px;'></span><br>" +
                "2. Be present in the <code>initialState</code> <span style='display:inline-block; width:12px; height:12px; background:darkgreen; margin-left:5px;'></span><br>" +
                "Some states may be declared but never initialized, or used without being typed. These should not be counted.<br><br>" +
                //"The actions inside the <code>reducers</code> can be ignored for this experiment.<br><br>"  +
                "The <code>code</code> inside the <span style='display:inline-block; width:12px; height:12px; background:darkred; margin-left:5px;'></span> box can be ignored for this experiment.<br><br>" +
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
                //"&nbsp;&nbsp;&nbsp;&nbsp;...<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;z: (state) => {<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state.a = 1;<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;},<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;...<br>" +
                "&nbsp;&nbsp;},<br>" +
                "});<br>" +
                "export const { a, b, z } = testSlice.actions;<br>" +
                "export default testSlice.reducer<br>" +
                "<br>" +
                "export const store = configureStore({\n<br>" +
                "&nbsp;&nbsp;reducer: {<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;testSlice: testSlice.reducer<br>" +
                "&nbsp;&nbsp;},<br>" +
                "})<br>" +
                "<br>" +
                "export type RootState = ReturnType&lt;typeof store.getState&gt;<br>" +
                "export type AppDispatch = typeof store.dispatch;<br>" +
                "<br>" +
                "export const useAppDispatch = useDispatch.withTypes&lt;AppDispatch&gt;();<br>" +
                "export const useAppSelector = useSelector.withTypes&lt;RootState&gt;();<br>" +
                "</td></tr>" +
                "</table></code>" +
                "<br> In this case <strong>'a'</strong> is a state that meets both criteria and can be counted, while <strong>'b'</strong> is only declared in the <code>interface</code> but not fulfilling the other condition, therefore it should <strong>NOT</strong> be counted!<br><br>" +
                "<strong>Only count states that meet both criteria and ignore any functions/actions.</strong>"),
            () => writer.print_string_on_stage("<strong>Jotai</strong> is a state management library for React that uses <em>atoms</em> as basic units of state.<br><br>" +
                "Each atom is a standalone piece of state created using <code>atom()</code>.<br><br>" +
                "Jotai does not use context, reducers, or slices — just simple atoms.<br><br>" +
                "In this experiment, the task is to only count atoms that hold an actual value, which serve as a state.<span style='display:inline-block; width:12px; height:12px; background:green; margin-left:5px;'></span><br>" +
                "Write-only atoms can be ignored.<span style='display:inline-block; width:12px; height:12px; background:darkred; margin-left:5px;'></span><br><br>" +
                "<table style='border: 1px solid black;'>" +
                "<tr><td style='border: 3px solid green; padding: 5px;'><code>" +
                "const a = atom(0);<br>" +
                "<code></td></tr>" +
                "<tr><td style='border: 3px solid darkred; padding: 5px;'><code>" +
                "const b = atom(<br>" +
                "&nbsp;&nbsp;null," +
                "&nbsp;&nbsp;(get, set) => {<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;set(a, 10 )<br>" +
                "&nbsp;&nbsp;}<br>" +
                ");<code></td></tr>" +
                "</table>" +
                "<br> In this case <strong>'a'</strong> is an <code>atom</code> that serves as a state and can be counted!" +
                "<br> Contrary to <strong>'a'</strong>, <strong>'b'</strong> is a write-only <code>atom</code> and should therefore not be counted.<br><br>" +
                "<strong>Only count states that meet the criteria and ignore any write-only atoms.</strong>" +
                "<br><br>Ok, you are now ready to start with the training phase (that you enter by pressing <code>[Enter]</code>)."),
        ],
        pre_run_training_instructions: writer.string_page_command("You entered the training phase. In the training phase, you get a random set of tasks, showing code for one of the previously explained tools.<br><br>" +
            "Please, run the training until you feel familiar with the experiment. This could be - for example - the case when you correctly answered the tasks 10 times.<br><br>" +
            "You can interrupt the training phase by pressing [ESC]. Otherwise, the training phase will be repeated.<br><br>" +
            "<b>Note that you can see that you are in the training phase (top, right of the screen says <code>Training</code>)</b><br><br>" +
            "Note that you give a response to a question by pressing a number between [0], and [9]. <br><br>" +
            "It is also advised to adjust the overall display scale of the page to see the whole code via <strong>CTRL</strong> + <strong>Mouse Wheel</strong> ."),
        pre_run_experiment_instructions: writer.string_page_command(writer.convert_string_to_html_string("You are now entering the experiment phase.")),
        finish_pages: [
            writer.string_page_command("<p>Experiment complete. Next, your data will be downloaded.</p>")
        ],
        layout: [
            { variable: "State_Management_Tool", treatments: ["Redux", "Jotai", "Context", "Zustand", "Redux_Error", "Context_Error", "Zustand_Error"] },
            { variable: "Amount_Group", treatments: ["0", "1"] },
        ],
        repetitions: 4,
        measurement: Reaction_Time(keys(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])),
        task_configuration: (t) => {
            let smt = t.treatment_value("State_Management_Tool");
            let amt = t.treatment_value("Amount_Group");
            let task = new Code_Generation_Task(false, smt, amt);
            let code = task.generate_code();
            let explanation = get_tasks_explanation(smt);
            console.log("*\n*\n*\n*\n*\n*\n*\n*\n*\n*\n*\n*\n*\n*\n*\n explanation: ", explanation);
            t.has_pre_task_description = true;
            t.do_print_pre_task = () => {
                const cleaned = String(smt).replace(/_Error$/, "");
                writer.print_string_on_stage("The next State Management Tool will be: " + cleaned);
                writer.print_string_on_stage(explanation);
                writer.print_string_on_stage("Press [Return].");
            };
            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_string_on_stage("<div class='sourcecode'>" + code + "</div>");
                t.expected_answer = task.answer;
            };
            t.do_print_after_task_information = () => {
                let error_msg = task.response_text();
                console.log(error_msg);
                if (t.given_answer == t.expected_answer) {
                    writer.print_string_on_stage("<div class='correct'>" + "CORRECT! Given answer: " + t.given_answer + "\n" + error_msg + "</div>");
                }
                else {
                    writer.print_error_string_on_stage(writer.convert_string_to_html_string("WRONG! Given answer: " + t.given_answer + "\n" + error_msg));
                }
            };
        }
    };
};
BROWSER_EXPERIMENT(experiment_configuration_function);
//# sourceMappingURL=experiment_count_states.js.map