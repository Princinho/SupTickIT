import { ArrowBack, ArrowForward, HighlightOff, Search } from '@mui/icons-material'
import { Button, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { PropTypes } from "prop-types"
import { useEffect, useState } from 'react'
export const PageHeader = (
    { pageTitle,
        pagePath,
        onAddButtonClick,
        sortingOptions,
        onSortingOptionChanged,
        onSearchTermChanged,
        currentPageIndex,
        onPageChanged,
        itemsCount,
        sortOption,
        rowsPerPage
    }) => {

    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => onSearchTermChanged(searchTerm), [searchTerm])
    return (
        <>
            <Typography variant='h5' component='span' sx={{ fontWeight: 'bold' }}>{pageTitle}</Typography>
            <Stack direction='row'>
                {pagePath.map(p => <Typography key={p} color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography>)}

                <Typography color='primary.light' sx={{ fontWeight: 'bold' }}>{pageTitle}</Typography>
            </Stack>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        {onAddButtonClick && <Button variant='contained'
                            onClick={() => onAddButtonClick(true)}
                            sx={{
                                color: 'white',
                                background: (theme) => theme.palette.primary.light,
                                textTransform: 'none'
                            }}>Ajouter</Button>}

                        {
                            sortingOptions && <FormControl sx={{ minWidth: '40%' }} size='small'>
                                <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Options"
                                    value={sortOption}
                                    onChange={event => onSortingOptionChanged(event.target.value)}
                                >
                                    {
                                        sortingOptions.map(s => <MenuItem key={'sorting-Option#' + s.name} value={s.name}>{s.label}</MenuItem>)
                                    }


                                </Select>
                            </FormControl>}
                    </Stack>

                </Grid>
                <Grid item xs={12} sm={7}>
                    <Stack direction='row' width='100%' spacing={{ xs: 1, sm: 2 }} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                        <TextField
                            id="companies-index-search-box" size='small'
                            sx={{ minWidth: '30%' }}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            aria-label='search'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControl sx={{ minWidth: '15%' }} size='small'>
                            <InputLabel id="demo-simple-select-label">Eléments</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Options"
                                value={rowsPerPage}
                            // onChange={event => changeRowsPerPage(event.target.value)}
                            >
                                <MenuItem value={-1}>All</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>

                            </Select>
                        </FormControl>

                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                            <Button
                                disabled={currentPageIndex == 0}
                                sx={{ backgroundColor: 'white', color: (theme) => theme.palette.text.secondary }}
                                onClick={() => onPageChanged(currentPageIndex - 1)}
                            ><ArrowBack />
                            </Button>
                            <Button
                                disabled={currentPageIndex >= Math.ceil(itemsCount / rowsPerPage) - 1}
                                onClick={() => onPageChanged(currentPageIndex + 1)}
                                sx={{ backgroundColor: 'white', color: (theme) => theme.palette.text.secondary }}><ArrowForward />
                            </Button>
                        </ButtonGroup>

                        <Button sx={{
                            backgroundColor: 'white', color: (theme) => theme.palette.primary.light,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderTopLeftRadius: '50%',
                            borderBottomLeftRadius: '50%',
                            padding: 0,
                            minWidth: '42px', paddingInline: '10px',
                            borderRight: 'none',
                            '&:hover': { borderRight: 'none' }
                        }}
                            variant='outlined'>
                            <HighlightOff />
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}
PageHeader.propTypes = {
    pageTitle: PropTypes.string.required,
    sortOption: PropTypes.string,
    pagePath: PropTypes.array.required,
    onAddButtonClick: PropTypes.func,
    sortingOptions: PropTypes.array,
    onSortingOptionChanged: PropTypes.func,
    onSearchTermChanged: PropTypes.func,
    currentPageIndex: PropTypes.number,
    itemsCount: PropTypes.number,
    onPageChanged: PropTypes.number,
    rowsPerPage: PropTypes.number,
}