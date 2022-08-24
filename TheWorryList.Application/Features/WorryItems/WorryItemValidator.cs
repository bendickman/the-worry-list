using FluentValidation;
using TheWorryList.Domain;

namespace TheWorryList.Application.Features.WorryItems
{
    public class WorryItemValidator : AbstractValidator<WorryItem>
    {
        public WorryItemValidator()
        {
            RuleFor(wi => wi.Situation).NotEmpty();
            RuleFor(wi => wi.Actions).NotEmpty();
            RuleFor(wi => wi.AnxietyLevel).NotEmpty();
            RuleFor(wi => wi.PositiveResponse).NotEmpty();
            RuleFor(wi => wi.Beliefs).NotEmpty();
            RuleFor(wi => wi.Emotions).NotEmpty();
            RuleFor(wi => wi.ThinkingStyle).NotEmpty();
            RuleFor(wi => wi.Thoughts).NotEmpty();
        }
    }
}