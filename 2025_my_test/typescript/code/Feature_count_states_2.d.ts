import { Task } from "../../../N-of-1-Experimentation/modules/Experimentation/Task";
export declare class Code_Generation_Task {
    hasError: boolean;
    stateManagementTool: string;
    answer: string;
    difficulty: number;
    errorType: number;
    correctStateGroup: number;
    constructor(hasError: boolean, stateManagementTool: string, correctStateGroup: string);
    error_position(): number;
    generate_code(): string;
    response_text(): string;
    debug_help(t: Task): void;
}
export declare function get_tasks_explanation(smt: string): string;
