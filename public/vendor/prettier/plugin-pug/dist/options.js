"use strict";
exports.__esModule = true;
exports.CATEGORY_PUG = 'Pug';
function resolveAttributeSeparatorOption(attributeSeparator) {
    switch (attributeSeparator) {
        case 'always':
            return true;
        case 'as-needed':
            return false;
    }
    throw new Error("Invalid option for pug attributeSeparator. Found '" + attributeSeparator + "'. Possible options: 'always' or 'as-needed'");
}
exports.resolveAttributeSeparatorOption = resolveAttributeSeparatorOption;
exports.options = {
    attributeSeparator: {
        since: '1.0.0',
        category: exports.CATEGORY_PUG,
        type: 'choice',
        "default": 'always',
        description: 'Change when attributes are separated by commas in tags.',
        choices: [
            {
                value: 'always',
                description: 'Always separate attributes with commas. Example: `button(type="submit", (click)="play()", disabled)`'
            },
            {
                value: 'as-needed',
                description: 'Only add commas between attributes where required. Example: `button(type="submit", (click)="play()" disabled)`'
            }
        ]
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxZQUFZLEdBQVcsS0FBSyxDQUFDO0FBTTFDLFNBQWdCLCtCQUErQixDQUFDLGtCQUEwQztJQUN6RixRQUFRLGtCQUFrQixFQUFFO1FBQzNCLEtBQUssUUFBUTtZQUNaLE9BQU8sSUFBSSxDQUFDO1FBQ2IsS0FBSyxXQUFXO1lBQ2YsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELE1BQU0sSUFBSSxLQUFLLENBQ2QsdURBQXFELGtCQUFrQixpREFBOEMsQ0FDckgsQ0FBQztBQUNILENBQUM7QUFWRCwwRUFVQztBQUVZLFFBQUEsT0FBTyxHQUFHO0lBQ3RCLGtCQUFrQixFQUFFO1FBQ25CLEtBQUssRUFBRSxPQUFPO1FBQ2QsUUFBUSxFQUFFLG9CQUFZO1FBQ3RCLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBTyxFQUFFLFFBQVE7UUFDakIsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxPQUFPLEVBQUU7WUFDUjtnQkFDQyxLQUFLLEVBQUUsUUFBUTtnQkFDZixXQUFXLEVBQ1Ysc0dBQXNHO2FBQ3ZHO1lBQ0Q7Z0JBQ0MsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFdBQVcsRUFDVixnSEFBZ0g7YUFDakg7U0FDRDtLQUNEO0NBQ0QsQ0FBQyJ9