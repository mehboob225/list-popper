```BASH
npm install @rom-kit/list-popper
```

Or

```BASH
yarn add install @rom-kit/list-popper
```

```CSS
:root {
  --theme-base: #6a950a;
  --theme-lightest: #c0e94f;
  --theme-lightest50: #c0e94f80;
}  
```

```JAVASCRIPT
import "@rom-kit/list-popper";
```

```JSX
<list-popper
    ref={ref}
    open={true}
    event="mouseover"
    label="All Project"
    style={{display: "inline-block"}}
>
    <div
    style={{
        borderRadius: "3px",
        border: "none",
        backgroundColor: "#517A00",
        height: "41px",
        width: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}
    onClick={(data)=>{console.log(data)}}
    >
    <svg style={{ width: "9px", height: "8px" }}>
        <path d="M0 0h9L4.5 5z" fill="white" fillRule="evenodd"></path>
    </svg>
    </div>
</list-popper>
```

```JAVASCRIPT
const dataArray = [
    { id: "1", label: "Label 1" },
    {
        id: "2",
        label: "Label 2",
        items: [{ id: "5", label: "Sub Label 5" }]
    },
    { id: "3", label: "Label 3" },
    { id: "4", label: "Label 4" },
    { id: "5", label: "Label 5" },
    { id: "6", label: "Label 6" },
];
```

```JAVASCRIPT
import { Props, Selection } from "@rom-kit/list-popper/dist/types";
```

```JS
const ref = React.useRef(null);

const onSelect = useCallback((data: Selection) => {
    console.log(data);
}, []);

useEffect(() => {
    if (ref.current) {
        const listPoper: HTMLElement & Props = ref.current;
        listPoper.items = dataArray;
        listPoper.onSelect = onSelect
    }
}, []);
```
