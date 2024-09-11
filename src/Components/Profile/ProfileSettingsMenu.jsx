import React from 'react';
import { Menu, MenuItem, FormControl, InputLabel, Select, Chip } from '@mui/material';

const ProfileSettingsMenu = ({ settingsAnchorEl, uiSettings, handleSettingsClose, handleThemeTypeChange, handleColorChange, predefinedGradients }) => {
  return (
    <Menu
      anchorEl={settingsAnchorEl}
      open={Boolean(settingsAnchorEl)}
      onClose={handleSettingsClose}
    >
      <MenuItem>
        <FormControl fullWidth>
          <InputLabel>Theme Type</InputLabel>
          <Select
            value={uiSettings.themeType}
            onChange={handleThemeTypeChange}
            label="Theme Type"
          >
            <MenuItem value="linear">Linear</MenuItem>
            <MenuItem value="gradient">Gradient</MenuItem>
          </Select>
        </FormControl>
      </MenuItem>

      <MenuItem>
        <FormControl fullWidth>
          <InputLabel>Theme Color</InputLabel>
          <Select
            name="themeColor"
            value={uiSettings.themeColor}
            onChange={handleColorChange}
            label="Theme Color"
          >
            {predefinedGradients.map((gradient) => (
              <MenuItem key={gradient.name} value={gradient.name}>
                <Chip
                  sx={{ background: `linear-gradient(90deg, ${gradient.colors[0]}, ${gradient.colors[1]})`, color: gradient.textColor }}
                  label={gradient.name}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MenuItem>
    </Menu>
  );
};

export default ProfileSettingsMenu;