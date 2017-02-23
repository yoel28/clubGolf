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
import {BaseViewComponent} from "./com.zippyttech.ui/view/base/baseView.component";
import {TooltipComponent} from "./com.zippyttech.ui/components/tooltips/tooltips.component";
import {TablesComponent} from "./com.zippyttech.ui/components/tables/tables.component";
import {SearchComponent} from "./com.zippyttech.ui/components/search/search.component";
import {FilterComponent} from "./com.zippyttech.ui/components/filter/filter.component";
import {SaveComponent} from "./com.zippyttech.ui/components/save/save.component";
import {SearchMultipleComponent} from "./com.zippyttech.ui/components/searchMultiple/searchMultiple.component";
import {GenerateOutputComponent} from "./com.zippyttech.club/process/generateOutput/generateOutput.component";
import {GetbackComponent} from "./com.zippyttech.club/process/getBack/getback.component";
import {ToastyModule} from "ng2-toasty";
import {RegisterFullComponent} from "./com.zippyttech.club/process/registerFull/registerFull.component";
import {FormComponent} from "./com.zippyttech.ui/components/form/form.component";
import {RecordInOutComponent} from "./com.zippyttech.club/process/recordInOut/recordInOut";
import {ModalComponent} from "./com.zippyttech.ui/components/modal/modal.component";
import {TermConditionsComponent} from "./com.zippyttech.business/termConditions/termConditions.component";
import {RuleViewComponent} from "./com.zippyttech.ui/components/ruleView/ruleView.component";
import {AccountModel} from "./com.zippyttech.access/account/account.model";
import {PermissionModel} from "./com.zippyttech.access/permission/permission.model";
import {RoleModel} from "./com.zippyttech.access/role/role.model";
import {UserModel} from "./com.zippyttech.access/user/user.model";
import {ChannelModel} from "./com.zippyttech.business/channel/channel.model";
import {EventModel} from "./com.zippyttech.business/event/event.model";
import {InfoModel} from "./com.zippyttech.business/info/info.model";
import {NotificationModel} from "./com.zippyttech.business/notification/notification.model";
import {ParamModel} from "./com.zippyttech.business/param/param.model";
import {RuleModel} from "./com.zippyttech.business/rule/rule.model";
import {ActivateComponent} from "./com.zippyttech.auth/activate/activate.component";
import {ChartViewComponent} from "./com.zippyttech.ui/components/chartview/chartview.component";
import {ListActionComponent} from "./com.zippyttech.ui/components/listAction/listAction.component";
import {LocationPickerComponent} from "./com.zippyttech.ui/components/locationPicker/locationPicker.component";
import {DataViewComponent} from "./com.zippyttech.ui/components/dataView/dataView.component";
import {BasicComponent} from "./com.zippyttech.common/basicComponent";
import {AntennaModel} from "./com.zippyttech.club/catalog/antenna/antenna.model";
import {BrandModel} from "./com.zippyttech.club/catalog/brand/brand.model";
import {CompanyModel} from "./com.zippyttech.club/catalog/company/company.model";
import {ContractModel} from "./com.zippyttech.club/catalog/contract/contract.model";
import {LocationModel} from "./com.zippyttech.club/catalog/location/location.model";
import {ModelModel} from "./com.zippyttech.club/catalog/model/model.model";
import {ProductModel} from "./com.zippyttech.club/catalog/product/product.model";
import {ProductTypeModel} from "./com.zippyttech.club/catalog/productType/productType.model";
import {QrcodeModel} from "./com.zippyttech.club/catalog/qrcode/qrcode.model";
import {RecordModel} from "./com.zippyttech.club/catalog/record/record.model";
import {StateModel} from "./com.zippyttech.club/catalog/state/state.model";
import {TagModel} from "./com.zippyttech.club/catalog/tag/tag.model";
import {TradeModel} from "./com.zippyttech.club/catalog/trade/trade.model";
import {UserGroupModel} from "./com.zippyttech.club/catalog/userGroup/userGroup.model";
import {UserStatusModel} from "./com.zippyttech.club/catalog/userStatus/userStatus.model";
import {UserTypeModel} from "./com.zippyttech.club/catalog/userType/userType.model";
import {VehicleModel} from "./com.zippyttech.club/catalog/vehicle/vehicle.model";
import {VehicleTypeModel} from "./com.zippyttech.club/catalog/vehicleType/vehicleType.model";
import {GetbackModel} from "./com.zippyttech.club/process/getBack/getback.model";
import {RegisterFullModel} from "./com.zippyttech.club/process/registerFull/registerFull.model";
import {AccountSelectComponent} from "./com.zippyttech.auth/accountSelect/accountSelect.component";
import {VehicleComponent} from "./com.zippyttech.club/catalog/vehicle/vehicle.component";

const routesDefault: Routes = [
    { path: '', redirectTo: 'init/dashboard', pathMatch: 'full'},
    { path: 'init/dashboard', component: DashboardComponent},
    { path: 'init/load', component: LoadComponent},
    { path: 'term/conditions', component: TermConditionsComponent},

    { path: 'auth/login', component: LoginComponent},
    { path: 'auth/accountSelect', component: AccountSelectComponent},
    { path: 'auth/login/:company', component: LoginComponent},
    { path: 'auth/recover', component: RecoverComponent},
    { path: 'account/recoverPassword/:id/:token', component: RecoverPasswordComponent},
    { path: 'account/active/:id/:token', component: ActivateComponent},

    { path: 'access/account', component: BasicComponent,data:{'model':AccountModel}},
    { path: 'access/role', component: BasicComponent,data:{'model':RoleModel}},
    { path: 'access/permission', component: BasicComponent,data:{'model':PermissionModel}},
    { path: 'access/user', component: BasicComponent,data:{'model':UserModel}},
    { path: 'access/user/type', component: BasicComponent,data:{'model':UserTypeModel}},
    { path: 'access/user/status', component: BasicComponent,data:{'model':UserStatusModel}},
    { path: 'access/user/group', component: BasicComponent,data:{'model':UserGroupModel}},
    { path: 'access/acl', component: AclComponent},
    { path: 'access/user/profile', component: ProfileComponent},


    { path: 'business/event', component: BasicComponent, data:{'model':EventModel}},
    { path: 'business/info', component: BasicComponent,data:{'model':InfoModel}},
    { path: 'business/rule', component: BasicComponent, data:{'model':RuleModel}},
    { path: 'business/param', component: BasicComponent , data:{'model':ParamModel}},
    { path: 'business/channel', component: BasicComponent,data:{'model':ChannelModel}},
    { path: 'business/notify', component: BasicComponent,data:{'model':NotificationModel}},


    { path: 'club/catalog/type/product', component: BasicComponent,data:{'model':ProductTypeModel}},
    { path: 'club/catalog/product', component: BasicComponent,data:{'model':ProductModel}},
    { path: 'club/catalog/status', component: BasicComponent,data:{'model':StateModel}},
    { path: 'club/catalog/qr', component: BasicComponent,data:{'model':QrcodeModel}},
    { path: 'club/catalog/trade', component: BasicComponent,data:{'model':TradeModel}},
    { path: 'club/catalog/trade/:userId', component: BasicComponent,data:{'model':TradeModel}},

    { path: 'club/catalog/vehicle', component: VehicleComponent},
    { path: 'club/catalog/vehicle/model', component: BasicComponent,data:{'model':ModelModel}},
    { path: 'club/catalog/vehicle/brand', component: BasicComponent,data:{'model':BrandModel}},
    { path: 'club/catalog/vehicle/type', component: BasicComponent,data:{'model':VehicleTypeModel}},
    { path: 'club/catalog/tag', component: BasicComponent,data:{'model':TagModel}},
    { path: 'club/catalog/company', component: BasicComponent,data:{'model':CompanyModel}},
    { path: 'club/catalog/antenna', component: BasicComponent,data:{'model':AntennaModel}},
    { path: 'club/catalog/location', component: BasicComponent,data:{'model':LocationModel}},

    { path: 'club/catalog/record', component: BasicComponent,data:{'model':RecordModel}},
    { path: 'club/catalog/contract', component: BasicComponent,data:{'model':ContractModel}},

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
export class AppRoutingModule {}

export const componentsDefault = [
    AccountSelectComponent,
    DashboardComponent,
    LoginComponent,
    RecoverComponent,
    RecoverPasswordComponent,
    AclComponent,
    ProfileComponent,
    ActivateComponent,
    LoadComponent,
    TermConditionsComponent,
    BasicComponent
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
    ChartViewComponent,
    LocationPickerComponent,
    ChartViewComponent,
    DataViewComponent
];

export const componentsApp = [
    GenerateOutputComponent,
    GetbackComponent,
    RegisterFullComponent,
    RecordInOutComponent,
    VehicleComponent
];

export const componentsPublic = [
    'LoginComponent',
    'ActivateComponent',
    'RecoverComponent',
    'RecoverPasswordComponent',
    'TermConditionsComponent'
];

export const modelsDefault=[
    AccountModel,
    PermissionModel,
    RoleModel,
    UserModel,
    ChannelModel,
    EventModel,
    InfoModel,
    NotificationModel,
    ParamModel,
    RuleModel
];
export const modelsApp=[
    AntennaModel,
    BrandModel,
    CompanyModel,
    ContractModel,
    LocationModel,
    ModelModel,
    ProductModel,
    ProductTypeModel,
    QrcodeModel,
    RecordModel,
    StateModel,
    TagModel,
    TradeModel,
    UserGroupModel,
    UserStatusModel,
    UserTypeModel,
    VehicleModel,
    VehicleTypeModel,
    GetbackModel,
    RegisterFullModel
];