 

using System.Linq;
using Autodesk.iLogic.Core.UiBuilderStorage;
using Autodesk.iLogic.UiBuilderCore.Data;
using Autodesk.iLogic.UiBuilderCore.Storage;
using Inventor;
using Shared;

namespace PluginUtilities
{
    public class iLogicForm
    {
        public string Name { get; set; }
        public InventorParameters Parameters { get; set; }
    }

    /// <summary>
    /// Read model-specific UI data from iLogic forms that are stored in an Inventor document.
    /// </summary>
    internal class iLogicFormsReader
    {
        #region Inner data types

        private class FormExtractor
        {
            private readonly FormSpecification _formSpec;
            private readonly InventorParameters _allowedParameters;
            private readonly InventorParameters _collectedParameters = new InventorParameters();

            private FormExtractor(FormSpecification formSpec, InventorParameters allowedParameters)
            {
                _formSpec = formSpec;
                _allowedParameters = allowedParameters;
            }

            public static iLogicForm Get(UiStorage storage, string formName, InventorParameters allowedParameters)
            {
                FormSpecification formSpec = storage.LoadFormSpecification(formName);
                var extractor = new FormExtractor(formSpec, allowedParameters);
                return extractor.Run();
            }

            private iLogicForm Run()
            {
                ProcessGroup(_formSpec);

                return new iLogicForm
                {
                    Name = _formSpec.Name,
                    Parameters = _collectedParameters
                };
            }

            private void ProcessGroup(UiElementContainerSpec container, UiElementContainerSpec containerToProcess = null)
            {
                if (containerToProcess == null)
                    containerToProcess = container;

                foreach (var elementSpec in containerToProcess.Items)
                {
                    ProcessElement(container, elementSpec);
                }
            }

            private void ProcessElement(UiElementContainerSpec container, UiElementSpec elementSpec)
            {
                switch (elementSpec)
                {
                    case ParameterControlSpec parameterControlSpec:
                        ProcessParameter(parameterControlSpec);
                        break;

                    case UiElementContainerSpec subContainer:
                        switch (subContainer)
                        {
                            case ControlSpecGroupBase controlGroup:
                                ProcessGroup(controlGroup);
                                break;
                            case ControlRowSpec _:
                                ProcessGroup(container, subContainer);
                                break;
                        }
                        break;
                }
            }

            private void ProcessParameter(ParameterControlSpec spec)
            {
                if (_allowedParameters.TryGetValue(spec.ParameterName, out var knownParameter))
                {
                    var result = new InventorParameter
                                    {
                                        Label = spec.Name.Trim(),
                                        Unit = knownParameter.Unit,
                                        ReadOnly = spec.ReadOnly,
                                        Value = knownParameter.Value,
                                        Values = knownParameter.Values
                                    };

                    _collectedParameters.Add(spec.ParameterName, result);
                }
            }
        }

        #endregion

        private readonly InventorParameters _allowedParameters;
        private readonly UiStorage _storage;

        /// <summary>Constructor.</summary>
        /// <param name="document">Inventor document.</param>
        /// <param name="allowedParameters">Map with Inventor parameters, which are allowed to be extracted.</param>
        public iLogicFormsReader(Document document, InventorParameters allowedParameters)
        {
            _allowedParameters = allowedParameters;
            _storage = UiStorageFactory.GetDocumentStorage(document);
        }

        public iLogicForm[] Extract()
        {
            return _storage.FormNames
                            .Select(GetGroupsAndParameters)
                            .ToArray();
        }

        private iLogicForm GetGroupsAndParameters(string formName)
        {
            return FormExtractor.Get(_storage, formName, _allowedParameters);
        }
    }
}
