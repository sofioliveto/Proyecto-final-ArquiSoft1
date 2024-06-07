// src/components/SearchBar.jsx
import PropTypes from 'prop-types';
import { Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ children }) => {



    return (
        <Box width="100%" maxW="md" mx="auto" mt={4}>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input type="text" placeholder="Buscar cursos por nombre..." />
                {children}
            </InputGroup>
        </Box>
    );
};

SearchBar.propTypes = {
    children: PropTypes.node,
};

export default SearchBar;
