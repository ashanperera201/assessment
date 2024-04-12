import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface IDropdownProps {
    options?: string[];
    onSelect: (value: string | string[]) => void;
    multiple?: boolean;
    id?: string;
    value?: string | string[];
    placeholder?: string;
    disabled?: boolean;
}

const Dropdown: React.FC<IDropdownProps> = ({ options, onSelect, multiple, id, value, placeholder, disabled }) => {
    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        const { target: { value }, } = event;
        onSelect(typeof value === 'string' ? value.split(',') : value)
    };

    const handleClear = (): void => {
        onSelect(multiple ? [] : '');
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id={id}>{placeholder}</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    multiple={multiple}
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label={placeholder} />}
                    MenuProps={MenuProps}
                    disabled={disabled}
                >
                    {options?.map((name, index) => (
                        <MenuItem key={index} value={name}>
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default Dropdown;
