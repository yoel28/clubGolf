import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from "./com.zippyttech.init/dashboard/dashboard.component";
import {LoginComponent} from "./com.zippyttech.auth/login/login.component";
import {RecoverComponent} from "./com.zippyttech.auth/recover/recover.component";
import {RecoverPasswordComponent} from "./com.zippyttech.auth/recoverPassword/recoverpassword.component";
import {AclComponent} from "./com.zippyttech.access/acl/acl.component";
import {ProfileComponent} from "./com.zippyttech.access/user/profile/profile.component";
import {ImageEditComponent} from "./com.zippyttech.ui/components/imageEdit/imageEdit.component";
import {LoadComponent} from "./com.zippyttech.init/load/load.component";
import {PermissionComponent} from "./com.zippyttech.access/permission/permission.component";
import {BaseViewComponent} from "./com.zippyttech.ui/view/base/baseView.component";
import {TooltipComponent} from "./com.zippyttech.ui/components/tooltips/tooltips.component";
import {TablesComponent} from "./com.zippyttech.ui/components/tables/tables.component";
import {SearchComponent} from "./com.zippyttech.ui/components/search/search.component";
import {FilterComponent} from "./com.zippyttech.ui/components/filter/filter.component";
import {SaveComponent} from "./com.zippyttech.ui/components/save/save.component";
import {RoleComponent} from "./com.zippyttech.access/role/role.component";
import {EventComponent} from "./com.zippyttech.business/event/event.component";
import {InfoComponent} from "./com.zippyttech.business/info/info.component";
import {RuleComponent} from "./com.zippyttech.business/rule/rule.component";
import {ParamComponent} from "./com.zippyttech.business/param/param.component";
import {AccountComponent} from "./com.zippyttech.access/account/account.component";
import {UserComponent} from "./com.zippyttech.access/user/user.component";
import {SearchMultipleComponent} from "./com.zippyttech.ui/components/searchMultiple/searchMultiple.component";
import {ProductTypeComponent} from "./com.zippyttech.club/catalog/productType/productType.component";
import {ProductComponent} from "./com.zippyttech.club/catalog/product/product.component";
import {StatusComponent} from "./com.zippyttech.club/catalog/state/state.component";
import {GenerateOutputComponent} from "./com.zippyttech.club/process/generateOutput/generateOutput.component";
import {GetbackComponent} from "./com.zippyttech.club/process/getBack/getback.component";
import {ToastyModule} from "ng2-toasty";
import {QrcodeComponent} from "./com.zippyttech.club/catalog/qrcode/qrcode.component";
import {TradeComponent} from "./com.zippyttech.club/catalog/trade/trade.component";
import {VehicleComponent} from "./com.zippyttech.club/catalog/vehicle/vehicle.component";
import {VehicleTypeComponent} from "./com.zippyttech.club/catalog/vehicleType/vehicleType.component";
import {ModelComponent} from "./com.zippyttech.club/catalog/model/model.component";
import {BrandComponent} from "./com.zippyttech.club/catalog/brand/brand.component";
import {TagComponent} from "./com.zippyttech.club/catalog/tag/tag.component";
import {UserTypeComponent} from "./com.zippyttech.club/catalog/userType/userType.component";
import {RegisterFullComponent} from "./com.zippyttech.club/process/registerFull/registerFull.component";
import {FormComponent} from "./com.zippyttech.ui/components/form/form.component";
import {UserStatusComponent} from "./com.zippyttech.club/catalog/userStatus/userStatus.component";
import {CompanyComponent} from "./com.zippyttech.club/catalog/company/company.component";
import {AntennaComponent} from "./com.zippyttech.club/catalog/antenna/antenna.component";
import {LocationComponent} from "./com.zippyttech.club/catalog/location/location.component";
import {RecordInOutComponent} from "./com.zippyttech.club/process/recordInOut/recordInOut";
import {RecordComponent} from "./com.zippyttech.club/catalog/record/record.component";
import {ContractComponent} from "./com.zippyttech.club/catalog/contract/contract.component";
import {NotificationComponent} from "./com.zippyttech.business/notification/notification.component";
import {ModalComponent} from "./com.zippyttech.ui/components/modal/modal.component";
import {ListActionComponent} from "./com.zippyttech.ui/components/listAction/listAction.component";
import {TermConditionsComponent} from "./com.zippyttech.business/termConditions/termConditions.component";
import {RuleViewComponent} from "./com.zippyttech.ui/components/ruleView/ruleView.component";
import {ChannelComponent} from "./com.zippyttech.business/channel/channel.component";
import {UserGroupComponent} from "./com.zippyttech.club/catalog/userGroup/userGroup.component";
import {ChartViewComponent} from "./com.zippyttech.ui/components/chartview/chartview.component";

const routesDefault: Routes = [

    { path: '', redirectTo: 'init/dashboard', pathMatch: 'full'},
    { path: 'init/dashboard', component: DashboardComponent},
    { path: 'init/load', component: LoadComponent},
    { path: 'term/conditions', component: TermConditionsComponent},

    { path: 'auth/login', component: LoginComponent},
    { path: 'auth/login/:company', component: LoginComponent},
    { path: 'auth/recover', component: RecoverComponent},
    { path: 'account/recoverPassword/:id/:token', component: RecoverPasswordComponent},

    { path: 'access/account', component: AccountComponent},
    { path: 'access/role', component: RoleComponent},
    { path: 'access/permission', component: PermissionComponent},
    { path: 'access/acl', component: AclComponent},
    { path: 'access/user', component: UserComponent},
    { path: 'access/user/profile', component: ProfileComponent},
    { path: 'access/user/type', component: UserTypeComponent},
    { path: 'access/user/status', component: UserStatusComponent},
    { path: 'access/user/group', component: UserGroupComponent},


    { path: 'business/event', component: EventComponent},
    { path: 'business/info', component: InfoComponent},
    { path: 'business/rule', component: RuleComponent},
    { path: 'business/param', component: ParamComponent},
    { path: 'business/channel', component: ChannelComponent},
    { path: 'business/notification', component: NotificationComponent},


    { path: 'club/catalog/type/product', component: ProductTypeComponent},
    { path: 'club/catalog/product', component: ProductComponent},
    { path: 'club/catalog/status', component: StatusComponent},
    { path: 'club/catalog/qr', component: QrcodeComponent},
    { path: 'club/catalog/trade', component: TradeComponent},
    { path: 'club/catalog/trade/:userId', component: TradeComponent},

    { path: 'club/catalog/vehicle', component: VehicleComponent},
    { path: 'club/catalog/vehicle/model', component: ModelComponent},
    { path: 'club/catalog/vehicle/brand', component: BrandComponent},
    { path: 'club/catalog/vehicle/type', component: VehicleTypeComponent},
    { path: 'club/catalog/tag', component: TagComponent},
    { path: 'club/catalog/company', component: CompanyComponent},
    { path: 'club/catalog/antenna', component: AntennaComponent},
    { path: 'club/catalog/location', component: LocationComponent},
    { path: 'club/catalog/record', component: RecordComponent},
    { path: 'club/catalog/contract', component: ContractComponent},

    { path: 'club/process/generate/output', component: GenerateOutputComponent},
    { path: 'club/process/getback', component:  GetbackComponent},
    { path: 'club/process/record', component:  RecordInOutComponent},

    { path: 'club/register/full', component:  RegisterFullComponent},



];
const routesApp: Routes = [];
@NgModule({
    imports: [
        RouterModule.forRoot(routesDefault.concat(routesApp)),
        ToastyModule.forRoot()
    ],
    exports: [RouterModule,ToastyModule]
})
export class AppRoutingModule {
}

export const componentsDefault = [
    DashboardComponent,
    LoginComponent,
    RecoverComponent,
    RecoverPasswordComponent,
    AclComponent,
    ProfileComponent,
    LoadComponent,
    PermissionComponent,
    RoleComponent,
    EventComponent,
    InfoComponent,
    RuleComponent,
    ParamComponent,
    AccountComponent,
    UserComponent,
    NotificationComponent,
    TermConditionsComponent,
    ChannelComponent
];
export const componentsView = [
    ImageEditComponent,
    BaseViewComponent,
    TooltipComponent,
    TablesComponent,
    SearchComponent,
    FilterComponent,
    SaveComponent,
    SearchMultipleComponent,
    FormComponent,
    ModalComponent,
    RuleViewComponent,
    ListActionComponent,
    ModalComponent,
    ChartViewComponent
];
export const componentsApp = [
    ProductTypeComponent,
    ProductComponent,
    StatusComponent,
    GenerateOutputComponent,
    GetbackComponent,
    QrcodeComponent,
    TradeComponent,
    VehicleComponent,
    ModelComponent,
    BrandComponent,
    VehicleTypeComponent,
    TagComponent,
    UserTypeComponent,
    RegisterFullComponent,
    UserStatusComponent,
    CompanyComponent,
    AntennaComponent,
    LocationComponent,
    RecordInOutComponent,
    RecordComponent,
    ContractComponent,
    UserGroupComponent
];
export const componentsPublic = [
    'LoginComponent',
    'ActivateComponent',
    'RecoverComponent',
    'RecoverPasswordComponent',
    'TermConditionsComponent'
];