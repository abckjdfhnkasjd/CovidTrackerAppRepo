import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { ShoppingListService } from './shopping-list/shopping-list.service';
import { CovidCaseService } from './covid/covidCase.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoggingService } from './logging.service';

@NgModule({
  providers: [
    // ShoppingListService,
    CovidCaseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
