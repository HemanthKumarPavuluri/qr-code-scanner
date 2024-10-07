import { IconDatabase } from "@tabler/icons-react";

const DOMAIN = "http://13.235.98.215:8001";

const ROUTES = [
  {
    label: "Professors",
    name: "professors",
  },
  {
    label: "Courses",
    name: "courses",
  },
  { label: "Students", name: "students" },
];

const THEME = {
  primaryColor: "proven",
  colors: {
    proven: [
      "#f0f1f9",
      "#dedfed",
      "#b9bcdb",
      "#9398cc",
      "#7279be",
      "#5e65b5",
      "#525bb2",
      "#444b9d",
      "#3b428d",
      "#31397d",
    ],
  },
};

const DEFAULT_TABLE_CONFIG = {
  initialState: { density: "xs" },
  enableTopToolbar: false,
  enableBottomToolbar: false,
  enableRowSelection: false,
  enableColumnOrdering: false,
  enableGlobalFilter: false,
  enableColumnActions: false,
  enableColumnFilters: false,
  enablePagination: false,
  enableSorting: false,
  enableStickyHeader: true,
};

export { ROUTES, THEME, DOMAIN, DEFAULT_TABLE_CONFIG };
