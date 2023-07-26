self.onInit = function() {
    self.ctx.$scope.data = self.ctx.data;
}

self.onDataUpdated = function() {
    self.ctx.detectChanges();
}

self.onResize = function() {
    if (self.ctx.height < self.ctx.width)
        $('.thermostat', self.ctx.$container)[0].style
        .zoom = 1 * (self.ctx.height / 410);
    else
        $('.thermostat', self.ctx.$container)[0].style
        .zoom = 1 * (self.ctx.width / 410);
}