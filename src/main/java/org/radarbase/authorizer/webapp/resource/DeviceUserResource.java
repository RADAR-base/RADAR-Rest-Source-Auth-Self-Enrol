package org.radarbase.authorizer.webapp.resource;

import java.util.List;

import javax.validation.Valid;

import org.radarbase.authorizer.service.DeviceService;
import org.radarbase.authorizer.service.dto.DeviceUserPropertiesDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeviceUserResource {

    private Logger logger = LoggerFactory.getLogger(DeviceUserResource.class);

    @Autowired
    private DeviceService deviceService;

    @PostMapping("/users")
    public ResponseEntity addAuthorizedDeviceUser(
            @RequestParam(value = "code") String code,
            @RequestParam(value = "state") String state) {
        logger.debug("Add a device user with code {} and state {}" , code, state);
        // TODO this should be created status
        return ResponseEntity
                .ok(this.deviceService.authorizeAndStoreDevice(code, state));
    }

    @GetMapping("/users")
    public ResponseEntity<List<DeviceUserPropertiesDTO>> getAllDeviceProperties() {
        logger.debug("Get all device users");
        return ResponseEntity
                .ok(this.deviceService.getAllDevices());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<DeviceUserPropertiesDTO> getAllDeviceProperties(
            @PathVariable Long id) {
        logger.debug("Get device user with id {}", id);
        return ResponseEntity
                .ok(this.deviceService.getDeviceUserById(id));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity updateDeviceUser(@Valid @PathVariable Long id,
            @RequestBody DeviceUserPropertiesDTO deviceUser) {
        logger.debug("Requesting to update deviceUser");
        return ResponseEntity
                .ok(this.deviceService.updateDeviceUser(id, deviceUser));
    }


}