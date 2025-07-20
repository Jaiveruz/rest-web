

export class UpdateTodoDto {
    
    private constructor (
        public readonly id: Number,
        public readonly text?: string,
        public readonly completeAt?: Date,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if (this.text) returnObj.text = this.text;
        if (this.completeAt) returnObj.completeAt = this.completeAt;

        return returnObj;
    }

    static create( props: {[key:string]: any} ): [string?, UpdateTodoDto?]  {

        const { id, text, completeAt } = props;
        let newCompleteAt = completeAt;

        console.log(newCompleteAt);
        
        if ( !id || isNaN(id) ) return ['ID is required and must be a number'];
        
        if ( completeAt ) {
            newCompleteAt = new Date(completeAt);
            console.log(newCompleteAt, '----s'
            );

            if ( newCompleteAt.toString() === 'Invalid Date' ) {
                return ['CompleteAt must be a valid date'];
            }
        }


        return [undefined, new UpdateTodoDto(id, text, newCompleteAt)];
    }
}