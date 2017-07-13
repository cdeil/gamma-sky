import numpy as np
import json
import os  # TODO remove
from collections import OrderedDict

__all__ = [
    'table_to_list_of_dict'
]


def table_to_list_of_dict(table):
    """Convert table to list of dict."""
    rows = []
    for row in table:
        data = OrderedDict()
        for name in table.colnames:
            val = row[name]
            # TODO: The below is not working, find a fix
            # if val in {np.nan}:
            #     val = None
            if isinstance(val, np.int64):
                val = int(val)
            elif isinstance(val, np.int32):
                val = int(val)
            elif isinstance(val, np.bool_):
                val = bool(val)
            elif isinstance(val, np.float):
                val = float(val)
            elif isinstance(val, np.float32):
                val = float(val)
            elif isinstance(val, np.str):
                val = str(val)
            elif isinstance(val, np.ndarray):
                vals = [float(_) for _ in val]
                val = list(vals)
            else:
                raise ValueError('Unknown type: {} {}'.format(val, type(val)))
            data[name] = val

        rows.append(data)

    return rows


def dump_to_json(data, filename):
    # Replace all instances of NaN and Inf values (which are not valid JSON) with null
    text = json.dumps(data)
    text = text.replace('NaN', 'null').replace('-Infinity', 'null').replace('Infinity', 'null')
    data = json.loads(text)

    with open(filename, 'w') as fh:
        json.dump(data, fh)

#
# def dump_list_to_json(cat, filename):
#     with open(filename, 'w') as fh:
#         data = json.dumps(cat._data_python_list)
#         mask = data.replace('NaN', 'null').replace('-Infinity', 'null').replace('Infinity', 'null')
#         json.dump(json.loads(mask), fh)
#
#
# def dump_dict_to_json(source, filename):
#     with open(filename, 'w') as fh:
#         data = json.dumps(source._data_python_dict)
#         mask = data.replace('NaN', 'null').replace('-Infinity', 'null').replace('Infinity', 'null')
#         json.dump(json.loads(mask), fh)