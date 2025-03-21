sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, syncStyleClass, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("sap.training.exc.controller.Overview", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "customer");
            },

            onSave: async function () {

                if (!this.pDialog) {
                    this.pDialog = await this.loadFragment({
                        name: "sap.training.exc.view.Dialog"
                    });

                    syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), this.pDialog);
                }

                this.pDialog.open();
            },

            onCloseDialog: function () {
                this.byId("dialog").close();
            },

            onCustomerChange: function (oEvent) {
                var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
                this.byId("bookingTable").setBindingContext(oBindingContext);
            },

            onFilterCustomers: function (oEvent) {
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery && sQuery.length > 0) {
                    aFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
                }
                
                var oTable = this.byId("customerTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            }

        });
    });
