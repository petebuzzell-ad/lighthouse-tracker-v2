import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const DeviceToggle = ({ onDeviceChange }) => {
  const [device, setDevice] = useState('desktop');

  const handleChange = (val) => {
    setDevice(val);
    onDeviceChange(val);
  };

  return (
    <ToggleButtonGroup type="radio" name="deviceOptions" value={device} onChange={handleChange}>
      <ToggleButton value="desktop">Desktop</ToggleButton>
      <ToggleButton value="mobile">Mobile</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DeviceToggle;
