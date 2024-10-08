﻿ 

namespace WebApplication.Processing
{
    /// <summary>
    /// Update project:
    /// - generate SVF
    /// - extract parameters and BOM
    /// - save current model
    /// </summary>
    public class UpdateProject : AggregatedDefinition
    {
        public UpdateProject(Publisher publisher) :
            base(publisher,
                new UpdateParameters(publisher),
                new CreateSVF(publisher),
                new CreateBOM(publisher))
        {
        }

        public override string Id => nameof(UpdateProject);
        public override string Description => "Update parameters";
    }
}
