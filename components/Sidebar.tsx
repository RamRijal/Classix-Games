"use client"
import { Analytics, BarChart, Bento, ChevronLeft, ChevronRight, Dashboard, Flaky, People, ShareLocation, ShoppingBag, ShoppingCart } from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import { SidebarItem, SidebarProps } from '../types/Sidebar';

export const defaultItems: SidebarItem[] = [
    { id: 1, path: "/Quiz", text: 'Quiz', icon: <Dashboard /> },
    { id: 2, path: "/Wordle", text: 'Wordle', icon: <People /> },
    { id: 3, path: "/TicTacToe", text: 'TicTacToe', icon: <ShoppingCart /> },
    { id: 4, path: "/2048", text: '2048', icon: <ShoppingBag /> },
    { id: 5, path: "/Contexto", text: 'Contexto', icon: <BarChart /> },
    { id: 6, path: "/Snake", text: 'Snake', icon: <Bento /> },
    { id: 7, path: "/Flappy Bird", text: 'Flappy Bird', icon: <Flaky /> },
    { id: 8, path: "/Car Race", text: 'Car Race', icon: <ShareLocation /> },
    { id: 9, path: "/Memorize", text: 'Memorize', icon: <Analytics /> }
];

export const Sidebar: React.FC<SidebarProps> = ({
    items = defaultItems,
    expanded,
    onToggle,
    toggleTheme,
    isdarkMode
}) => {
    const [activeItemId, setActiveItemId] = useState<number | null>(null);


    const handleExpansion = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle?.(!expanded);
    };

    const handleItemClick = (item: SidebarItem) => {
        setActiveItemId(item.id);
        item.onClick?.();
    }
    const handleThemeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Stop the event from bubbling up
        e.stopPropagation();
        toggleTheme();
    };


    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                minWidth: expanded ? 260 : 80,
                transition: 'width 400ms ease-in-out',
                '& .MuiDrawer-paper': {
                    minWidth: expanded ? 260 : 80,
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    transition: 'width 400ms ease-in-out',
                }
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', paddingY: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: 20, display: expanded ? 'block' : 'none' }}>
                        Classix Games
                    </Typography>
                    <IconButton
                        onClick={handleExpansion}
                        size="small"
                        sx={{
                            ml: expanded ? 0 : 'auto',
                            mr: expanded ? 0 : 'auto'
                        }}>
                        {expanded ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </Box>
                <List sx={{ flexGrow: 1, mt: 2, px: 1 }}>
                    {items.map((item) => (
                        <Link
                            key={item.id}
                            href={item.path}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemButton
                                onClick={() => handleItemClick(item)}
                                selected={activeItemId === item.id}
                                sx={{
                                    cursor: "pointer",
                                    minHeight: 48,
                                    px: 2,
                                    py: 1,
                                    borderRadius: 1,
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'text.primary',
                                        minWidth: expanded ? 40 : 48,
                                        mr: expanded ? 2 : 0,
                                    },
                                    '& .MuiListItemText-root': {
                                        display: expanded ? 'block' : 'none',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: expanded ? 40 : 48,
                                    mr: expanded ? 2 : 0,
                                    color: 'inherit'
                                }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {expanded && (
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            transition: 'opacity 300ms ease-in-out',
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Box>
            <Box
                onClick={(e) => e.stopPropagation()}  // Stop event bubbling at the container level
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingX: 2,
                    paddingY: 2,
                    mt: 'auto',
                    px: 2,
                    py: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    flexDirection: 'column',
                }}>
                {expanded && (
                    <Typography
                        variant='h6'
                        sx={{
                            fontWeight: 700,
                            fontSize: 14,
                            transition: 'opacity 300ms ease-in-out',
                        }}
                    >
                        {isdarkMode ? "Dark Mode" : "Light Mode"}
                    </Typography>
                )}
                <Switch
                    checked={isdarkMode}
                    onChange={handleThemeToggle}
                    size="medium"
                />
            </Box>
        </Drawer >
    );
};