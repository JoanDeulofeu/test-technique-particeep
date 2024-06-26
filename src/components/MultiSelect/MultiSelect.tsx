import * as React from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { TextField } from "@mui/material";

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

// Components find here: https://mui.com/material-ui/react-select/#chip
export default function MultiSelect({
	categories,
	categorySelected,
	setCategorySelected,
}: {
	categories: string[];
	categorySelected: string[];
	setCategorySelected: (value: string[]) => void;
}) {
	const theme = useTheme();

	const handleChange = (event: SelectChangeEvent<typeof categorySelected>) => {
		const {
			target: { value },
		} = event;
		setCategorySelected(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-chip-label">Category</InputLabel>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={categorySelected}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Category" />}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{categories.map((category) => (
						<MenuItem
							key={category}
							value={category}
							style={getStyles(category, categorySelected, theme)}
						>
							{category}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
