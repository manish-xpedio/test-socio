import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './admin/home/home.component';
import { ChangepassComponent } from './admin/changepass/changepass.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './admin/register/register.component';
import { WingsComponent } from './admin/wings/wings.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { LogoComponent } from './admin/logo/logo.component';
import { CarouselComponent } from './admin/carousel/carousel.component';
import { ErrdictComponent } from './admin/errdict/errdict.component';
import { EmailserverComponent } from './admin/emailserver/emailserver.component';
import { EmailserverformComponent } from './admin/emailserverform/emailserverform.component';
import { EmailtemplateComponent } from './admin/emailtemplate/emailtemplate.component';
import { SmscComponent } from './admin/smsc/smsc.component';
import { SmstemplateComponent } from './admin/smstemplate/smstemplate.component';
import { NotichannelsComponent } from './admin/notichannels/notichannels.component';
import { PaymentgatewayComponent } from './admin/paymentgateway/paymentgateway.component';
import { PaymentgatewayformComponent } from './admin/paymentgatewayform/paymentgatewayform.component';
import { PaymethodsComponent } from './admin/paymethods/paymethods.component';
import { BanksComponent } from './admin/banks/banks.component';
import { SellertypeComponent } from './admin/sellertype/sellertype.component';
import { SellersubtypeComponent } from './admin/sellersubtype/sellersubtype.component';
import { SellercatsComponent } from './admin/sellercats/sellercats.component';
import { SellerservtypesComponent } from './admin/sellerservtypes/sellerservtypes.component';
import { TickettypesComponent } from './crm/tickettypes/tickettypes.component';
import { TicketsubtypeComponent } from './crm/ticketsubtype/ticketsubtype.component';
import { TicketcatComponent } from './crm/ticketcat/ticketcat.component';
import { EscmatrixComponent } from './crm/escmatrix/escmatrix.component';
import { CrmactioncodesComponent } from './crm/crmactioncodes/crmactioncodes.component';
import { TatsComponent } from './crm/tats/tats.component';
import { SyslogsComponent } from './admin/syslogs/syslogs.component';
import { BussentityComponent } from './admin/bussentity/bussentity.component';
import { UseraccComponent } from './admin/useracc/useracc.component';
import { AccessprofilesComponent } from './admin/accessprofiles/accessprofiles.component';
import { AccesscontrolsComponent } from './admin/accesscontrols/accesscontrols.component';
import { FlattypeComponent } from './admin/flattype/flattype.component';
import { MemprofileComponent } from './crm/memprofile/memprofile.component';
import { MemprofilelistComponent } from './crm/memprofilelist/memprofilelist.component';
import { CommtypeComponent } from './admin/commtype/commtype.component';
import { VisitorsComponent } from './support/visitors/visitors.component';
import { VisitormasterlistComponent } from './support/visitormasterlist/visitormasterlist.component';
import { IncidentvisitComponent } from './support/incidentvisit/incidentvisit.component';
import { InvitesComponent } from './support/invites/invites.component';
import { InviteformComponent } from './support/inviteform/inviteform.component';
import { VisitorlogComponent } from './support/visitorlog/visitorlog.component';
import { PendingvisitorreqComponent } from './support/pendingvisitorreq/pendingvisitorreq.component';
import { BookingsComponent } from './support/bookings/bookings.component';
import { SrmgmtComponent } from './support/srmgmt/srmgmt.component';
import { SrnewComponent } from './support/srnew/srnew.component';
import { SropenComponent } from './support/sropen/sropen.component';
import { SrcloseComponent } from './support/srclose/srclose.component';
import { SrpublicComponent } from './support/srpublic/srpublic.component';
import { MyaccComponent } from './fin/myacc/myacc.component';
import { VisitormenuComponent } from './support/visitormenu/visitormenu.component';
import { BlockvisitorComponent } from './support/blockvisitor/blockvisitor.component';
import { VisitorparkbookComponent } from './support/visitorparkbook/visitorparkbook.component';
import { VehicleregComponent } from './crm/vehiclereg/vehiclereg.component';
import { MaintchargeComponent } from './fin/maintcharge/maintcharge.component';
import { AccmenuComponent } from './fin/accmenu/accmenu.component';
import { AccountsComponent } from './fin/accounts/accounts.component';
import { MaintchargelistComponent } from './fin/maintchargelist/maintchargelist.component';
import { PayhistoryComponent } from './fin/payhistory/payhistory.component';
import { MyaccmenuComponent } from './fin/myaccmenu/myaccmenu.component';
import { MakepaymentComponent } from './fin/makepayment/makepayment.component';
import { MeminvoicesComponent } from './fin/meminvoices/meminvoices.component';
import { EventsncalsComponent } from './support/eventsncals/eventsncals.component';
import { SecmenuComponent } from './support/secmenu/secmenu.component';
import { SecurityComponent } from './support/security/security.component';
import { GatepassComponent } from './support/gatepass/gatepass.component';
import { VisitorpendingreqComponent } from './support/visitorpendingreq/visitorpendingreq.component';
import { TenantshiftaccessComponent } from './support/tenantshiftaccess/tenantshiftaccess.component';
import { SrprogressComponent } from './crm/srprogress/srprogress.component';
import { SrgrevComponent } from './crm/srgrev/srgrev.component';
import { SrmenuComponent } from './crm/srmenu/srmenu.component';
import { ByelawsComponent } from './reports/byelaws/byelaws.component';
import { WatermenuComponent } from './ops/watermenu/watermenu.component';
import { WatermgmtComponent } from './ops/watermgmt/watermgmt.component';
import { WatersourcesComponent } from './ops/watersources/watersources.component';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'changepass', component: ChangepassComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'wings', component: WingsComponent},
	{path: 'settings', component: SettingsComponent},
	{path: 'logo', component: LogoComponent},
	{path: 'carousel', component: CarouselComponent},
	{path: 'errdict', component: ErrdictComponent},
	{path: 'emailserver', component: EmailserverComponent},
	{path: 'emailserverform', component: EmailserverformComponent},
	{path: 'emailtemplate', component: EmailtemplateComponent},
	{path: 'smsc', component: SmscComponent},
	{path: 'smstemplate', component: SmstemplateComponent},
	{path: 'notichannels', component: NotichannelsComponent},
	{path: 'paymentgateway', component: PaymentgatewayComponent},
	{path: 'paymentgatewayform', component: PaymentgatewayformComponent},
	{path: 'paymethods', component: PaymethodsComponent},
	{path: 'banks', component: BanksComponent},
	{path: 'sellertype', component: SellertypeComponent},
	{path: 'sellersubtype', component: SellersubtypeComponent},
	{path: 'sellercats', component: SellercatsComponent},
	{path: 'sellerservtypes', component: SellerservtypesComponent},
	{path: 'tickettypes', component: TickettypesComponent},
	{path: 'ticketsubtype', component: TicketsubtypeComponent},
	{path: 'ticketcat', component: TicketcatComponent},
	{path: 'escmatrix', component: EscmatrixComponent},
	{path: 'crmactioncodes', component: CrmactioncodesComponent},
	{path: 'tats', component: TatsComponent},
	{path: 'syslogs', component: SyslogsComponent},
	{path: 'bussentity', component: BussentityComponent},
	{path: 'useracc', component: UseraccComponent},
	{path: 'accessprofiles', component: AccessprofilesComponent},
	{path: 'accesscontrols', component: AccesscontrolsComponent},
	{path: 'flattype', component: FlattypeComponent},
	{path: 'memprofile', component: MemprofileComponent},
	{path: 'memprofilelist', component: MemprofilelistComponent},
	{path: 'commtype', component: CommtypeComponent},
	{path: 'visitors', component: VisitorsComponent},
	{path: 'visitormasterlist', component: VisitormasterlistComponent},
	{path: 'incidentvisit', component: IncidentvisitComponent},
	{path: 'invites', component: InvitesComponent},
	{path: 'inviteform', component: InviteformComponent},
	{path: 'visitorlog', component: VisitorlogComponent},
	{path: 'pendingvisitorreq', component: PendingvisitorreqComponent},
	{path: 'incidentvisit', component: IncidentvisitComponent},
	{path: 'bookings', component: BookingsComponent},
	{path: 'srmgmt', component: SrmgmtComponent},
	{path: 'srnew', component: SrnewComponent},
	{path: 'sropen', component: SropenComponent},
	{path: 'srclose', component: SrcloseComponent},
	{path: 'srpublic', component: SrpublicComponent},
	{path: 'myacc', component: MyaccComponent},
	{path: 'visitors', component: VisitorsComponent},
	{path: 'visitormenu', component: VisitormenuComponent},
	{path: 'blockvisitor', component: BlockvisitorComponent},
	{path: 'visitorparkbook', component: VisitorparkbookComponent},
	{path: 'vehiclereg', component: VehicleregComponent},
	{path: 'maintcharge', component: MaintchargeComponent},
	{path: 'accmenu', component: AccmenuComponent},
	{path: 'accounts', component: AccountsComponent},
	{path: 'maintchargelist', component: MaintchargelistComponent},
	{path: 'payhistory', component: PayhistoryComponent},
	{path: 'myaccmenu', component: MyaccmenuComponent},
	{path: 'makepayment', component: MakepaymentComponent},
	{path: 'meminvoices', component: MeminvoicesComponent},
	{path: 'eventsncals', component: EventsncalsComponent},
	{path: 'secmenu', component: SecmenuComponent},
	{path: 'security', component: SecurityComponent},
	{path: 'gatepass', component: GatepassComponent},
	{path: 'visitorlog', component: VisitorlogComponent},
	{path: 'visitorpendingreq', component: VisitorpendingreqComponent},
	{path: 'tenantshiftaccess', component: TenantshiftaccessComponent},
	{path: 'srprogress', component: SrprogressComponent},
	{path: 'srgrev', component: SrgrevComponent},
	{path: 'srmenu', component: SrmenuComponent},
	{path: 'byelaws', component: ByelawsComponent},
	{path: 'watermenu', component: WatermenuComponent},
	{path: 'watermgmt', component: WatermgmtComponent},
	{path: 'watersources', component: WatersourcesComponent}
]

@NgModule({
  imports: [
	RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
