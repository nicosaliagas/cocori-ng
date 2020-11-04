/*
 * Public API Surface of cocori-ng
 */

export * from './lib/config/config.components';

export * from './lib/shared/shared.module';
export * from './lib/shared/material-shared.module';

export * from './lib/shared/directive/default-image.directive';

export * from './lib/shared/pipe/pretty-print.pipe';

export * from './lib/shared/component/form/index';
export * from './lib/shared/component/form/form-container/form-container.component';
export * from './lib/shared/component/form/form-buttons/form-buttons.component';
export * from './lib/shared/component/form/buttons/button/button.component';
export * from './lib/shared/component/form/input-text/input-text.component';
export * from './lib/shared/component/form/input-textarea/input-textarea.component';

export * from './lib/core/model/schema-datas.model';
export * from './lib/core/model/component-inputs.model';

export * from './lib/core/service/inject-component.service';
export * from './lib/core/service/http.service';
export * from './lib/core/service/subscription.service';
export * from './lib/core/service/form.service';

export * from './lib/core/core.module';
