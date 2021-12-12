
export * from './config/config.components';
export * from './config/config.events';

export * from './core/service/inject-component.service';
export * from './core/service/validators.service';
export * from './core/service/helper/helper.service';
export * from './core/service/helper/url-helper';
export * from './core/service/helper/helper-form.service';
export * from './core/service/http.service';
export * from './core/service/datasource.service';
export * from './core/service/uploader/uploader.service';
export * from './core/service/broadcast-event.service';
export * from './core/service/toast-message.service';
export * from './core/service/storage.service';
export * from './core/service/datagrid/datagrid.service';
export * from './core/service/odata-query-builder/queryBuilder';
export * from './core/service/token.service';
export * from './core/service/confirm-modal.service';
export * from './core/service/current-url-routing.service';
export * from './core/service/form-builder/form-builder.service';

export * from './core/model/data-source.model';
export * from './core/model/form-input-components.model';
export * from './core/model/schema-datas.model';
export * from './core/model/component-inputs.model';
export * from './core/model/component-wysiwyg.model';
export * from './core/model/component-uploader.model';
export * from './core/model/error.model';
export * from './core/model/component-datagrid.model';
export * from './core/model/form-datas.model';
export * from './core/model/modal.model';

export * from './shared/directive/color-picker/cocoring-colorpicker.module';
export * from './shared/directive/color-picker/cocoring-colorpicker.directive';

export * from './shared/pipe/variable-html/cocoring-variable-html.module';
export * from './shared/pipe/variable-html/cocoring-variable-html.pipe';

/** components */

export * from './shared/component/error-handler/input-error-handler/cocoring-input-error.component';
export * from './shared/component/error-handler/input-error-handler/cocoring-input-error.module';

export * from './shared/component/wysiwyg/cocoring-wysiwyg.module';
export * from './shared/component/wysiwyg/cocoring-wysiwyg.component';

export * from './shared/component/toast-error-stacktrace/toast-error-stacktrace.module';
export * from './shared/component/toast-error-stacktrace/toast-error-stacktrace.component';

// @TODO supprimer cocoring-auto-unsubscribe.module et le remplacer par takeUntil(detroy) ...
export * from './shared/component/auto-unsubscribe/cocoring-auto-unsubscribe.module';
export * from './shared/component/auto-unsubscribe/cocoring-auto-unsubscribe.component';

export * from './shared/component/modal/confirm-modal/cocoring-confirm-modal.component';
export * from './shared/component/modal/confirm-modal/cocoring-confirm-modal.module';

export * from './shared/component/form/form-buttons/cocoring-buttons-group.component';
export * from './shared/component/form/form-buttons/cocoring-buttons-group.module';

export * from './shared/component/form/inputs/input-icon/input-icon.component';
export * from './shared/component/form/inputs/input-icon/input-icon.module';

export * from './shared/component/form/inputs/input-checkbox/cocoring-checkbox.component';
export * from './shared/component/form/inputs/input-checkbox/cocoring-checkbox.module';

export * from './shared/component/form/inputs/input-checkbox-indeterminate/checkbox-indeterminate.component';
export * from './shared/component/form/inputs/input-checkbox-indeterminate/checkbox-indeterminate.module';

export * from './shared/component/form/inputs/input-date/cocoring-date.component';
export * from './shared/component/form/inputs/input-date/cocoring-date.module';

export * from './shared/component/form/inputs/input-email/cocoring-email.component';
export * from './shared/component/form/inputs/input-email/cocoring-email.module';

export * from './shared/component/form/inputs/input-number/cocoring-number.component';
export * from './shared/component/form/inputs/input-number/cocoring-number.module';

export * from './shared/component/form/inputs/input-password/cocoring-password.component';
export * from './shared/component/form/inputs/input-password/cocoring-password.module';

export * from './shared/component/form/inputs/input-select/cocoring-select.component';
export * from './shared/component/form/inputs/input-select/cocoring-select.module';

export * from './shared/component/form/inputs/input-text/cocoring-text.component';
export * from './shared/component/form/inputs/input-text/cocoring-text.module';

export * from './shared/component/form/inputs/input-textarea/cocoring-textarea.component';
export * from './shared/component/form/inputs/input-textarea/cocoring-textarea.module';

export * from './shared/component/form/inputs/input-viewer/cocoring-viewer.component';
export * from './shared/component/form/inputs/input-viewer/cocoring-viewer.module';

export * from './shared/component/form/form-container/cocoring-form-container.component';
export * from './shared/component/form/form-container/cocoring-form-container.module';

export * from './shared/component/form/index';

export * from './shared/component/button/cocoring-button.module';
export * from './shared/component/button/cocoring-button.component';