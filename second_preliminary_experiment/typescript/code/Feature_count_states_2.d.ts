export declare class Code_Generation_Task {
    hasError: boolean;
    stateManagementTool: string;
    answer: string;
    difficulty: number;
    errorType: number;
    correctStateGroup: number;
    constructor(hasError: boolean, stateManagementTool: string, correctStateGroup: string);
    generate_code(): string;
    response_text(): string;
}
export declare function get_tasks_explanation(smt: string): string;
