import { platformBrowser }    from '@angular/platform-browser';

import { AppModuleNgFactory } from '../aot/appRoot/com.zippyttech.base/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
  .then(success => console.log("Bootstrap success aot"))
  .catch(error => console.log(error));
